const { filterByQuery, findById, createNewnotes, validatenotes } = require('../../lib/notes');
const { notes } = require('../../data/notes');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
  router.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    if (!validatenotes(req.body)) {
      res.status(400).send('The notes is not properly formatted.');
    } else {
      const notes = createNewnotes(req.body, notes);
      res.json(notes);
    }
  });

  module.exports  = router;