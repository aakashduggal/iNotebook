const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_Screte = 'AakashDuggalisagoodb$oy'

router.post('/create', [
    body('name', 'Enter a valid name').isLength(5),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength(3)
], async (req, res) => {
    //1 way to create user
    // const user = User(req.body)
    // user.save()
    // res.send(req.body)
    // console.log(req.body)
    // console.log(user)

    //checking validation 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //3rd way 
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
          return res.status(400).json({error: 'User with this email already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const scrPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: scrPass
        })


        // implementing jwt here
        // this is done as jwt require a field which will be used for comparison, here it is user id, as user id is unique
        const data = {
            user:{
                id:user.id
            }
        }

        // jwt also require a other field which is signature, here it is JWT_Screte for checking or comparison on it basis if info has been changed or not

        const authToken = jwt.sign(data, JWT_Screte)

       res.send(authToken)
    } catch (error) {
        console.error(error.message)
      return res.status(500).json('Internal Server Error')
    }

    // //2nd way to create user
    // User.create({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password: req.body.password
    // }).then(user => res.send(user))
    // .catch(err => {console.log(err)
    //     res.status(400).json({error: 'Please enter a valid email', message: err.message})
    // })
    // res.send(req.body)

})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
//if there are errors, return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }
    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if (!user) {
           return res.status(400).json('Please enter valid credentials')
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
           return res.status(400).json('Please enter valid credentials')
        }

        const data = {
            user:{
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_Screte)

        res.json(authToken)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Internal Server Error')
    }



})

module.exports = router