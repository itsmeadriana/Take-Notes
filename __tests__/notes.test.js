const fs = require('fs');
const {
    findNoteById,
    writeNewNote,
    validateNewNote,
    deleteNote
} = require('../Develop/notes.js');
const { notes } = require('../data/notes.json');
const { hasUncaughtExpressCaptureCallback } = require('process');

jest.mock('fs');

test("creates a new note", () => {
    const note = writeNewNote(
        { title: "To-Do", text: "Buy a suitcase, cook dinner, buy party decorations, call mom", id: "23" },
        notes
    );

    expect(note.title).toBe("To-Do");
    expect(note.text).toBe("Buy a suitcase, cook dinner, buy party decorations, call mom");
    expect(note.id).toBe("23")
});

test("finds note by id", () => {
    const startingNotesToSelf = [
        {
            id: "4",
            title: "Sunday brunch",
            text: "eggs, pancakes, raspberry jam, blueberry compote, vegan lattes. Oat milk or almond milk?"
        },
        {
            id: "11",
            title: "Mantras",
            text: "You are worthy. You are enough. You matter. Welcome kindness into your life by being kind."
        }
    ];

    const result = findNoteById("11", startingNotesToSelf);
    expect(result.title).toBe("Mantras");
});

test("validates new note addition", () => {
    const validNoteToSelf =
        {
            id: "4",
            title: "Sunday brunch",
            text: "eggs, pancakes, raspberry jam, blueberry compote, vegan lattes. Oat milk or almond milk?"
        }
    
    
        const invalidNoteToSelf = 
        {
            id: "11",
            // title: Mantras,
            text: "You are worthy. You are enough. You matter. Welcome kindness into your life by being kind."
        }
    

    const result = validateNewNote(validNoteToSelf);
    const result2 = validateNewNote(invalidNoteToSelf);

    expect(result).toBe(true);
    expect(result2).toBe(false);

});

test("deletes note by id", () => {
    const startingNotesToSelf = [
        {
            id: "4",
            title: "Sunday brunch",
            text: "eggs, pancakes, raspberry jam, blueberry compote, vegan lattes. Oat milk or almond milk?"
        },
        {
            id: "11",
            title: "Mantras",
            text: "You are worthy. You are enough. You matter. Welcome kindness into your life by being kind."
        }
    ];

    const result = deleteNote(0, startingNotesToSelf);

    expect(result[0].title).toBe("Mantras");
})