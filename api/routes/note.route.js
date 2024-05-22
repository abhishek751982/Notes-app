const express = require('express');
const Note = require('../models/note.model.js');
const router = express.Router();
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/note.controller.js');

router.get('/', getNotes);
router.get("/:id", getNote);

router.post("/", createNote);

// update a note
router.put("/:id", updateNote);

// delete a note
router.delete("/:id", deleteNote);

module.exports = router;