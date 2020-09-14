// Import (require) connection.js into orm.js
var connection  =require("../config/connection.js"); 

function selectAll(cb){
  var query = "SELECT * FROM burgers"; 
  connection.query(query, function(err, res) {
    if (err) {throw err}; 
    cb(res);
    console.log("All burgers selected"); 
  }); 
}

function insertOne(newBurger, cb){
  var query = "INSERT INTO burgers (burger_name) VALUES (?)"; 
  connection.query(query, newBurger, function (err, res) {
    if (err) throw err; 
    cb(res);
    console.log("Added new burger"); 
  }); 
}

function updateOne(condition, cb){
  var query = "UPDATE burgers SET devoured = '1' WHERE " + condition; 
  connection.query(query, function(err, res) {
    if (err) throw err; 
    cb(res);
    console.log("changed to devoured"); 
  }); 
}

module.exports = {
  selectAll,
  insertOne,
  updateOne
}; 

