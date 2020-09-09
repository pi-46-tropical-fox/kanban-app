const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const mainRouter = require('./routers')

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(mainRouter)


app.listen(port, () => console.log(`kanban-server is listening on port ${port}`))
