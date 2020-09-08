require('dotenv').config()
const express = require('express')
const route = require('./routers')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors)

app.use('/', route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})