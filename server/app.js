const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')

app.use(express.urlencoded({ extended: true }))

app.use('/', route)

app.listen(port, () => {
    console.log(`Listening At Port ${port}`);
})