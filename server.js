// require express
var express = require("express"); 
var path = require("path"); 

// Set up port
var PORT = process.env.PORT || 3000; 

// Create express app
var app = express(); 
app.use(express.urlencoded({ extend: true})); 
app.use(express.json()); 

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// app listening 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  