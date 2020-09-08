const router = require('express').Router()
// const UserController = require('../controllers/UserController.js')
const Task = require('../controllers/TaskController.js')

router.use('/kanban', Task.getTasks)

module.exports = router