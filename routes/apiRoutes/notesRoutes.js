const router = require('express').Router();
const { notes } = require('../../data/notes.json');
const { writeNewNote, findNoteById, validateNewNote, deleteNote } = require('../../Develop/notes.js');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        res.json(results);
    }
    else {
        res.send(406)
    }
});

router.get('/notes/:id', (req, res) => {
    const result = findNoteById(req.params.id, notes);
    if (result) {
        res.json(result);
    }
    else {
        res.send(405);
    }
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    req.body.id = notes.length.toString();

    if (!validateNewNote(req.body)) {
        res.status(400).send('This note is not properly formatted. Or something.');
    } else {
        const note = writeNewNote(req.body, notes);
        res.json(req.body);
    }

})

router.delete('/notes/:id', (req, res) => {

    let selectedNote = findNoteById(req.params.id, notes);
    let currentNotesArrayIndex = notes.indexOf(selectedNote);
    deleteNote(currentNotesArrayIndex, notes);
    
    res.json(notes);

});

module.exports = router;