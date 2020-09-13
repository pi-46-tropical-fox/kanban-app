require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')
const errHandler = require('./middlewares/errHandler')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/', route)
app.use(errHandler)

app.listen(port, () => {
    console.log(`Listening At Port ${port}`);
})