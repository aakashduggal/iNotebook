const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'
 
const connectedToMongo = async ()=>{
try {
       await mongoose.connect(mongoURI) 
       console.log("Connected To Mongo Successfully")
} catch (error) {
    console.log(`Connection failed ${error}`)
}
}

module.exports = connectedToMongo 