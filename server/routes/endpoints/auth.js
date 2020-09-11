const AuthController = require('../../controllers/AuthController')
const UserController = require('../../controllers/UserController')
const { authentication } = require('../../middleware/auth')

const endpoint = require('express').Router()

endpoint
.get('/check', authentication)
.post('/register', UserController.register)
.post('/login', AuthController.login)
.post('/login/google', AuthController.googleLogin)

module.exports = endpoint