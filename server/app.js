const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errHandler')
require('dotenv').config()


//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//Using Router
app.use(routes)


//Error Handler Middleware
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})