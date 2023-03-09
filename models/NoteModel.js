const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: String, required: true }
}, {
    versionKey: false
})

const NoteSchema = mongoose.model("note", noteSchema)

module.exports = {
    NoteSchema
}