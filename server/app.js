require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000 // || process.env.PORT
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }));
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Kanban listening on port`, port)
})

module.exports = app 
