const { Router } = require('express')

const route = require('express').Router()
const UserRouter = require('./UserRoute')
const TaskRouter = require('./TaskRoute')


route.use('/', UserRouter)
route.use('/tasks', TaskRouter)


module.exports = route