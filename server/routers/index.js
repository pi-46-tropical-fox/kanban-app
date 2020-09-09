const route = require('express').Router()
const userRouter = require('./userRouter')

route.use('/user', userRouter)


module.exports = route
