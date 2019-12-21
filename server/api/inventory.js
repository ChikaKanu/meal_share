var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var async = require("async");

app.use(bodyParser.json());
module.exports = app;

//Creates database

const inventoryDB = new Datastore({
    filename: "./server/databases/inventory.db",
    autoload: true
});

//Get inventory

app.get("/", function(req, res){
    res.send("Inventory API")
})


//Get a meal from inventory by _id
app.get("/meal/:mealId", ((req,res)=> {
    (!req.params.mealId)?
    res.status(500).send("ID field is required") :
    inventoryDB.findOne({_id: req.params.mealId}, ((err, meal)=> {
        res.send(meal);
    }))
}))

// Get all inventory meals
app.get("/meals", ((req, res)=>{
    inventoryDB.find({}, ((err, docs)=>{
        console.log("sending inventory meals");
        res/send(docs); 
    }))
}))

//Create inventory meal
app.post("/meal", ((req, res)=>{
    const newMeal = req.body;
    inventoryDB.insert(newMeal, ((err, meal)=>{
        err? res.status(500).send(err):
        res.send(meal);
    }))
}))

app.delete("/meal/:mealId", ((req, res)=>{
    inventoryDB.remove({_id: req.params.mealId}, ((err, numRemoved)=>{
        err? res.status(500).send(err):
        res.sendStatus(200);
    }))
}))

//update meal
app.put("/meal", ((req, res)=>{
    const mealId = req.body._id;
    inventoryDB.update({_id, mealId}, req.body, {}, ((err, numReplaced, meal)=>{
        err? res.status(500).send(err):
        res.sendStatus(200);
    }))
}))

app.decrementInventory = function(meals){
    async.eachSeries(meals, ((transactionMeal, callback)=>{
        inventoryDB.findOne({_id: transactionMeal._id}, ((err, meal)=>{
            //catch manually added items (don't exist in the meals collection)
            if (!meal || !meal.quantity_on_hand){
                callback();
            } else {
                const updatedQuantity = parseInt(meal.quantity_on_hand) - parseInt(transactionMeal.quantity);
                inventoryDB.update(
                     {_id: meal._id},
                     {$set: {quantity_on_hand: updatedQuantity}},
                     {},
                     callback
                )}
            })
        )
    }))
}
