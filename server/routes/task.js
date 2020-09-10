const taskRoutes = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authentication, authorization } = require('../middlewares/auth')

taskRoutes.post('/tasks', authentication, TaskController.addTask)
taskRoutes.get('/tasks', authentication, TaskController.getTask)
taskRoutes.get('/tasks/:id', authentication, authorization, TaskController.getTaskId)
taskRoutes.put('/tasks/:id', authentication, authorization, TaskController.updateTask)
taskRoutes.delete('/tasks/:id', authentication, authorization, TaskController.deleteTask)



module.exports = taskRoutes