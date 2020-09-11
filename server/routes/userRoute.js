const route = require('express').Router()
const UserController = require('../controllers/UserController.js')
const googleLoginController = require('../controllers/googleLoginController')

route.post('/login', UserController.login)
route.post('/register', UserController.register)
route.post('/login', googleLoginController.verifyLogin)



module.exports = route