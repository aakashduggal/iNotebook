const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    obj = {
        this: 'yo'
    }
    res.send(obj)
})

module.exports = router