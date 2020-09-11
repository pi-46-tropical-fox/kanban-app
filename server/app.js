if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const route = require('./routes')
const port = process.env.PORT || 3000
const cors = require('cors')
const {errHandler} = require('./middlewares/errHandler')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', route)

app.use(errHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))