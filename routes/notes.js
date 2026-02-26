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

module.exports = router