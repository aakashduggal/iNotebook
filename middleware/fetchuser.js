var jwt = require('jsonwebtoken')
const JWT_Screte = 'AakashDuggalisagoodb$oy'

const fetchuser = (req, res, next)=>{

    try {
        const token = req.header('auth-token')
        if(!token){
            res.status(400).json("Please authenticate using valid token")
        }
        const data = jwt.verify(token, JWT_Screte)
        req.user = data.user
        next()
    } catch (error) {
        console.error(error.message)
         res.status(400).json("Please authenticate using valid token")
    }

}

module.exports = fetchuser