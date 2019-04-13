
const notes     = require('./notes') // Notes utilities
const yargs     = require('yargs')
const fs        = require('fs')
const chalk     = require('chalk')

yargs.version('1.1.0')  

// Create add command.
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    },
})

// Create remove.
yargs.command({
    command: "remove",
    describe: "Remove a new note",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    } 
})

// Create list.
yargs.command({
    command: "list",
    describe: "Lists all notes",
    handler(argv) {
        notes.listNotes()
    }
})

// Read note
yargs.command({
    command: 'read',
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()
