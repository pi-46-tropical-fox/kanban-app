const taskRoutes = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authentication } = require('../middlewares/auth')

taskRoutes.post('/tasks', TaskController.addTask)
taskRoutes.get('/tasks', authentication, TaskController.getTask)
taskRoutes.get('/tasks/:id', TaskController.getTaskId)
taskRoutes.put('/tasks/:id', TaskController.updateTask)
taskRoutes.delete('/tasks/:id', TaskController.deleteTask)



module.exports = taskRoutes