const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Note = require('../models/Note')

router.get('/getAllnotes', fetchuser, (req, res)=>{
 try {
    const note = Note.find({user : req.user.id})
    res.send(note)
 } catch (error) {
    res.status(400).send({error: "Can't find notes, maybe user do not have any note"})
 }
})

module.exports = router