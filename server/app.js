'use strict'
require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const routes = require('./routes')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(errorHandler)
app.use(routes)


app.listen(PORT,()=>{
  console.log('running on port ' + PORT)
})