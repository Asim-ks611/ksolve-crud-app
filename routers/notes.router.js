const express = require( "express")

const {getAllNotes,addNotes,updateNotes,deleteNotes} = require("./notes.controller.js")

const notesRouter = express.Router()

//////  --- NOTES-ROUTING  --- //////

notesRouter.get('/',getAllNotes)
notesRouter.post('/',addNotes)
notesRouter.put('/:id',updateNotes)
notesRouter.delete('/:id',deleteNotes)

module.exports = notesRouter