const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter note title"],
        },
        details: {
            type: String,
            required: [true, "Please enter note details"],
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
