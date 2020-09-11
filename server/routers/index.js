const route = require('express').Router()
const userRouter = require('./userRouter')
const tasksRouter = require('./tasksRouter')

const { authentication } = require('../middlewares/auth')

route.use('/user', userRouter)

route.use(authentication)

route.use('/tasks', tasksRouter)



module.exports = route
