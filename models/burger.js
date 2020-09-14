// require orm.js
var orm = require("../config/orm"); 

// code to call the ORM functions using burger specific 
// input for the orm

function all(cb){
    orm.selectAll(function(res){
        cb(res);
    }); 
}; 

function addBurger(newBurger, cb){
    orm.insertOne(newBurger, function(res){
        cb(res);
    });
};

function eatBurger(eatBurger, cb){
    orm.updateOne(eatBurger, function(res){
        cb(res);
    }); 
}; 

// export at the end of file

module.exports = {
    all, 
    addBurger, 
    eatBurger
}; 