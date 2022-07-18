const express = require('express');
const fs = require('fs');
const path = require('./db');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {
  readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

app.post('/api/notes', function(req, res) {
  const note = req.body;
  readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
    const notes =[].concat(JSON).parse(data));
    note.id = notes.length +1
    notes.push(note);
    return notes
  }).then(function(notes) {
    writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
    res.JSON(note);
  });

app.delete('/api/notes/:id', function(req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = []
    for (let i = 0; i<notes.length; i++) {
      if(idToDelete !== notes[i].id) {
        newNotesDara.push(notes[i])
      }
    }
    return newNotesData
  }).then(function(notes) {
    writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
    res.send('saved success');
    })
  })

  //HTML ROUTE
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/db/db.json"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});  

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});
//Listening
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
