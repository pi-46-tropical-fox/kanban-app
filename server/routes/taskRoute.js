const route = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

route.get('/', authentication, TaskController.showTask)
route.post('/', authentication, TaskController.addTask)
route.get('/:taskId', authentication, authorization, TaskController.oneTask)
route.put('/:taskId', authentication, authorization, TaskController.updateTask)
route.put('/category/:taskId', authentication, authorization, TaskController.updateTaskCategory)
route.delete('/:taskId', authentication, authorization, TaskController.deleteTask)

module.exports = route