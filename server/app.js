require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const errorHandler = require('./middlewares/errHandler')
const cors = require('cors')


app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cors())

app.use('/', route)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Your app almost complete. On port: ${port}`);
})