var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var async = require("async");

app.use(bodyParser.json());
module.exports = app;

//Creates database

const mealsDB = new Datastore({
    filename: "./server/databases/meals.db",
    autoload: true
});

//Get inventory

app.get("/", function(req, res){
    res.send("meals API")
})


//Get a meal from meals by _id
app.get("/meal/:mealId", ((req,res)=> {
    (!req.params.mealId)?
    res.status(500).send("ID field is required") :
    mealsDB.findOne({_id: req.params.mealId}, ((err, meal)=> {
        res.send(meal);
    }))
}))

// Get all meals
app.get("/meals", ((req, res)=>{
    mealsDB.find({}, ((err, meals)=>{
        console.log("sending meals");
        res/send(meals); 
    }))
}))

//Create meal
app.post("/meal", ((req, res)=>{
    const newMeal = req.body;
    mealsDB.insert(newMeal, ((err, meal)=>{
        err? res.status(500).send(err):
        res.send(meal);
    }))
}))

app.delete("/meal/:mealId", ((req, res)=>{
    mealsDB.remove({_id: req.params.mealId}, ((err, numRemoved)=>{
        err? res.status(500).send(err):
        res.sendStatus(200);
    }))
}))

//update meal
app.put("/meal", ((req, res)=>{
    const mealId = req.body._id;
    mealsDB.update({_id, mealId}, req.body, {}, ((err, numReplaced, meal)=>{
        err? res.status(500).send(err):
        res.sendStatus(200);
    }))
}))

app.decrementMeals = function(meals){
    async.eachSeries(meals, ((transactionMeal, callback)=>{
        mealsDB.findOne({_id: transactionMeal._id}, ((err, meal)=>{
            //catch manually added items (don't exist in the meals collection)
            if (!meal || !meal.quantity_on_hand){
                callback();
            } else {
                const updatedQuantity = parseInt(product.quantity_on_hand) - parseInt(transactionMeal.quantity);
                 mealsDB.update(
                     {_id: meal._id},
                     {$set: {quantity_on_hand: updatedQuantity}},
                     {},
                     callback
                )}
            })
        )
    }))
}
