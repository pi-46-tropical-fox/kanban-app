'use strict'

if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HOME!')
})

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Listening on port:' , port);
})