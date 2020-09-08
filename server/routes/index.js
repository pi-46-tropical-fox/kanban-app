const route = require('express').Router()
const userRoute = require('./userRoute.js')
const taskRoute = require('./taskRoute')

route.use('/users', userRoute)
route.use('/tasks', taskRoute)

module.exports = route