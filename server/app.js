const { exec } = require('child_process')

exec(`npm ls dotenv`, (err,stdout,stderr) => { // checks for dotenv extension
    let res = stdout.search('empty')

    if(stdout.search('empty') === -1) require('dotenv').config()
    const express = require('express')
    const routes = require('./routes')
    const errHandler = require('./middleware/errHandler')
    const app = express()
    const cors = require('cors')
    const port = process.env.PORT || 3457

    app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(routes)
    .use(errHandler)
    .listen(port, () => console.log(`Translating binaries... and while you're at it, why don't go to port ${port}?`))

    console.log(res);
})