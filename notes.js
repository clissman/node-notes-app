const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added.'))
    } else {
        console.log(chalk.red.inverse('Note title taken.'))
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = notes => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJsON)
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length == 0) {
        console.log(chalk.red.inverse('No notes to display')) 
    } else {
        console.log(chalk.blue.inverse('Your notes:'))
        notes.forEach(note => console.log(note.title))
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.blue.inverse(`Title: ${note.title}`) + `\nBody: ${note.body}`)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}