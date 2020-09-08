// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs"); 
const { raw } = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
console.log(__dirname);



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log(__dirname); 
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
    
  fs.readFile('db.json', function(err, data) {
    if (err) throw err; 
  
    let dbNotes = JSON.parse(data);
    res.send(dbNotes); 
  });
});

// Delete selected note
app.delete("/api/notes/:id", function(req, res) {

  fs.readFile('db.json', function(err, data) {
    if (err) throw err; 
  
    let result = JSON.parse(data);
    res.send(result); 

    var chosen = req.params.id;
    var noteArray = [];   

    for (i=0; i<result.length; i++){
      let dbNotes = result[i];
      if (chosen === dbNotes.id){
        noteArray = noteArray; 
      } else {
        noteArray.push(dbNotes); 
      }
    }

    let jsonAllNotes = JSON.stringify(noteArray); 

    fs.writeFileSync('db.json', jsonAllNotes, function (err){
      if (err) throw err; 
    console.log("Saved db.json"); 
    });

  });

}); 

// Create New notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;
  newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
  var noteArray = []; 

  fs.readFile('db.json', function(err, data) {
    if (err) throw err; 
    let result = JSON.parse(data);
    res.send(result); 

    for (i=0; i<result.length; i++){
      let dbNotes = result[i]
      noteArray.push(dbNotes); 
    }

    noteArray.push(newNote); 
    //console.log(noteArray); 

    let jsonAllNotes = JSON.stringify(noteArray); 
  
    fs.writeFileSync('db.json', jsonAllNotes, function (err){
      if (err) throw err; 
      console.log("New note added to db"); 
   }); 
  
  });

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
