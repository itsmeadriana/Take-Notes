const {v4: uuidv4} = require('uuid')
const router = require('express').Router();
const { notes } = require('../../data/notes.json');
const { writeNewNote, findNoteById, validateNewNote, deleteNote } = require('../../Develop/notes.js');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findNoteById(req.params.id, notes);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

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