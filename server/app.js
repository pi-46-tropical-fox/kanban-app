const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')
require('dotenv').config()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

app.use(router)

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Kanban app listening at port:${port}`)
})