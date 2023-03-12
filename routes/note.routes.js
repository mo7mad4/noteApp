const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('../middlewares/authenticator');
const { NoteModel } = require('../models/NoteModel');
const noteRouter = express.Router();

//use authorization for note Router
noteRouter.use(authenticator)

// get all note for one user by token 
noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization
    jwt.verify(token, "Mohammed", async (err, decode) => {

        try {
            let data = await NoteModel.find({ user: decode.userId })
            res.send({
                data: data,
                message: "Success",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })

        }
    })

})


//modfiy note for user by id 
noteRouter.patch("/", async(req, res) => {
    let { id } = req.headers
    
    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send({
            message: "Note update",
            status:1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status:1
        })
        
    }
    
})

//delete note for user by id 
noteRouter.delete("/", async(req, res) => {
    let { id } = req.headers
    
    try {
        await NoteModel.findByIdAndDelete({ _id: id }, req.body)
        res.send({
            message: "Note deleled",
            status:1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status:1
        })
        
    }
    
})

//create note by user token
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