const userRoutes = require('express').Router()
const UserController = require('../controllers/userController')


userRoutes.post('/register', UserController.register)
userRoutes.post('/login', UserController.login)

userRoutes.post('/googleLogin', UserController.googleLogin)


module.exports = userRoutes