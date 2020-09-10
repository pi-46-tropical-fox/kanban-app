const express = require('express')

const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const mainRouter = require('./routers')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(mainRouter)


app.listen(port, () => console.log(`kanban-server is listening on port ${port}`))


console.log(process.env.NODE_ENV)
