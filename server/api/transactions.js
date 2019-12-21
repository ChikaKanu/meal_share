var app = require('express')();
var Inventory = require('./inventory');
var server = require('http').Server(app)
var bodyParser = require('body-parser')
var Datastore = require('nedb')

app.use(bodyParser.json())

module.exports = app

//Create Database
const Transactions = new Datastore({
    filename: './server/databases/transactions.db',
    autoload: true
})

app.get('/', ((req, res)=>{
    res.send('Transactions API')
}))

//Get all transactions
app.get('/all', ((req, res) => {
    Transactions.find({}, ((err, docs)=> {
        res.send(docs)
    }))
}))

//Get all transactions
app.get('/limit', ((req, res)=>{
    const limit = parseInt(req.query.limit, 10)
    if(!limit) limit = 5
    Transactions.find({}).limit(limit).sort({ date: -1}).exec((err, docs)=>{
        res.send(docs)
    })
}))

//Get total meals for the current day
app.get('/day-total', ((req, res)=>{
    //if date is provided
    if (req.query.date){
    startDate = new Date(req.query.date)
    startDate.setHours(0,0,0,0)

    endDate = new Date(req.query.date)
    endDate.setHours(23,59,59,999)
    } else {
    // beginning of current day
        const startDate = new Date()
        startDate.setHours(0,0,0,0)

        //end of current day
        const endDate = new Date()
        endDate.setHours(23,59,59,999)
    }

    Transactions.find({date: { 
        $gte: startDate.toJSON(), 
        $lte: endDate.toJSON()}}, ((err, docs)=> {
        const result = {
            date: startDate
        }

        if(docs){

            const total = docs.reduce((p, c)=> {
                return p + c.total}, 0.00)                   
            result.total = parseFloat(parseFloat(total).toFixed(2))
            res.send(result)
        } else {
            result.total = 0;
            res.send(result)
        }
    }))
}))

//Get transactions for a particular date

app.get('/by-date', ((req, res)=>{
    const startDate = new Date(2018, 2, 21);
    startDate.setHours(0,0,0,0)

    const endDate = new Date(2015, 2, 21);
    endDate.setHours(23,59,59,999)

    Transactions.find({date: {
        $gte: startDate.toJSON(),
        $lte: endDate.toJSON()}}, ((err, docs)=>{
            if (docs){
                res.send(docs)
            }
        })
    )
}))

//Add new transaction

app.post('/new', ((req, res)=>{
    const newTransaction = req.body
    Transactions.insert(newTransaction, ((err, transaction)=>{
        if (err){
            res.status(500).send(err)
        } else {
            res.sendStatus(200)
            Inventory.decrementInventory(transaction.meals)
        }
    }))

}))

//Get a single transaction

app.get('/:transactionId', ((req, res)=>{
    Transactions.find({_id: req.params.transactionId}, ((err, doc)=> {
    if(doc){
        res.send(doc[0])
    }}))
}))