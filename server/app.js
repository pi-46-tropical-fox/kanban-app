require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require ("./routes/index.js")

const app = express()
const port = 3000

app.use (express.urlencoded ({ extended : true}))
app.use (express.json ())

app.use(cors())

app.use ("/", router)

app.listen(port, () => {
  console.log(`Kanban App listening at http://localhost:${port}`)
})