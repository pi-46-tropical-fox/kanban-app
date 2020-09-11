const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/register', UserController.register)
route.post('/googlelogin', UserController.googleLogin)
route.post('/login', UserController.login)

module.exports = route
