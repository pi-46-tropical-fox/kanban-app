require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)

app.use(errHandler)


app.listen(port, () => {
    console.log(`KANBAN APP LISTENIN ON PORT ${port}`);
})