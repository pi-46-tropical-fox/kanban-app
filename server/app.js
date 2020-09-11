const express = require('express')

const cors = require('cors')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000
const mainRouter = require('./routers')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(mainRouter)

io.on('connection', (socket) => {
    console.log('connection', socket)
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => console.log(`kanban-server is listening on port ${port}`))

