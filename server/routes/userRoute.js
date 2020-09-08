const route = require('express').Router()
const UserController = require('../controllers/UserController.js')

route.post('/login', UserController.login)
route.post('/register', UserController.register)



module.exports = route