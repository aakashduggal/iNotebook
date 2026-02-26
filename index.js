const express = require('express')
const connectedToMongo = require('./db')

connectedToMongo()
const app = express()

const port = 5000


app.get('/', (req, res)=>{
  res.send('Hello world')
})

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`App is listening on the port http://localhost:${port}`)
}) 