// require express
var express = require("express");
var router = express.Router();
// require burger.js
var burger = require("../models/burger.js"); 

// create the 'router' for the app, 

router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject); 
    });
}); 

router.post("/api/burgers", function(req, res){
    burger.addBurger([req.body.burger_name], function(result){
        res.json({id: result.insertId}); 
    });
}); 

router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id; 
    console.log("condition", condition); 
    burger.eatBurger(
        condition,
        function(result) {
            if (result.changedRows === 0){
            return res.status(404).end();
            }
            res.status(200).end();    
          }
    ); 
}); 

// and export the router at the end of file
module.exports = router; 