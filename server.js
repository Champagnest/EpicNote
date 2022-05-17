
const fs = require('fs');
const express = require('express')
const PORT = process.env.PORT || 3001;
const notes =  require('./db/db.json');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

function createNewnotes(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFile(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  )
  return note;
}

function deleteNote(id, notesArray) {
  console.log('ID from deleteNote function: ' + id);
  notesArray.splice(
    notesArray.indexOf(notesArray.filter(element => element.id === id)[0]),
    1
  );
  fs.writeFile(
    path.join(__dirname, '.db/db.json'),
    JSON.stringify(notesArray, null, 2),
    (err) => {
      console.log(err);
    }
  );
  return notesArray;
}



app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
  console.log(notes);

  if (notes.length === 0) {
    req.body.id = notes.length.toString();
  } else {
    let lastNote =  notes.length - 1;
    let lastNoteId = parseInt(notes[lastNote].id);
    let nextId = lastNoteId + 1;
    req.body.id = nextId.toString();
  }
  const note = createNewnotes(req.body, notes);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  deleteNote(noteId, notes);
  res.send(`Note ID ${noteId} deleted`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

