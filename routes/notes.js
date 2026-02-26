const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator') 

// route 1 : To get all user notes : Get route
router.get('/getAllnotes', fetchuser, async (req, res)=>{
 try {
    const note = await Note.find({user : req.user.id})
    res.send(note)
 } catch (error) {
    res.status(400).send({error: "Can't find notes, maybe user do not have any note"})
 }
})

// route 2 : to create user notes : user must be logged in, Post route
router.post('/addNote',fetchuser,[
    body('title', 'Title must be 3 character long').isLength({min: 3}),
    body('description', 'Description should be atleast 5 character long').isLength({min: 5})
], async (req, res)=>{
    try {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }

        const {title, description, tag} = req.body
        const note = new Note({
            title, description, tag, user: req.user.id
        })
      const saveNote = await note.save()
      res.json(saveNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: 'Failed to save notes'})
    }
})

// route 3 : update note , login required, put request
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        let note = await Note.findById(req.params.id)
        if(!note){
           return res.status(401).send('No note to update')
        }

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Unauthorised to do")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.send(note)


    } catch (error) {
        res.status(500).json("Server error while updating note")
    }
})

// route 4 : Delete note , login required, put request
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {

        let note = await Note.findById(req.params.id)
        if(!note){
           return res.status(401).send('No note to delete')
        }

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Unauthorised to do")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.send("Note Deleted Successfully", note)


    } catch (error) {
        res.status(500).json("Server error while deleting note")
    }
})

module.exports = router