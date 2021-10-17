const fs = require('fs');
const path = require('path');

function findNoteById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function writeNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify( { notes: notesArray }, null, 2)
    );
    return note;
}

function validateNewNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(index, notesArray) {    
    notesArray.splice(index, 1) 
//     {
         
// };
    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify( { notes: notesArray }, null, 2)
    );
    return notesArray;
}

module.exports = {
    writeNewNote,
    validateNewNote,
    deleteNote,
    findNoteById,
}