const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errHandler')
require('dotenv').config()
const cors = require('cors')


//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Cors
app.use(cors())

//Using Router
app.use(routes)

//Error Handler Middleware
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})