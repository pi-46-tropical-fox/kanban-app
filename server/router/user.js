const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
// const Task = require('../controllers/TaskController.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

module.exports = router