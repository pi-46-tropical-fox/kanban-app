const routes = require('express').Router()
const userRoutes = require('./user')
const taskRoutes = require('./task') 

routes.get('/', (req, res) => {
    res.send('Hello World')
})

routes.use('/', userRoutes)
routes.use('/', taskRoutes)

module.exports = routes