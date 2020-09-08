const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
// const Task = require('../controllers/TaskController.js')

router.use('/register', UserController.register)
router.use('/login', UserController.login)

module.exports = router