const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('../middlewares/authenticator');
const { NoteModel } = require('../models/NoteModel');
const noteRouter = express.Router();

noteRouter.use(authenticator)


noteRouter.get("/", async (req, res) => {
    // 59: 51 / 4: 39: 52
    try {
        let data = await NoteModel.find()
    } catch (error) {

    }

    res.send({
        message: "All The Notes",
        status: 1
    })
})

noteRouter.post("/create", async (req, res) => {
    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "Note created",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })

    }
})

module.exports = {
    noteRouter,
}