const route = require('express').Router()
const userRouter = require('./userRouter')
const tasksRouter = require('./tasksRouter')

const { authentication } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errorHandler')

route.use('/user', userRouter)

route.use(authentication)
route.use('/tasks', tasksRouter)

route.use(errorHandler)


module.exports = route
