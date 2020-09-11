require('dotenv').config()
const express = require('express')
const app = express()
const port =  process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const error = require('./middleware/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(error)


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})