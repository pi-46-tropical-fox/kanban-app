const route = require('express').Router()
const TaskController = require('../controllers/TaskController')

const { authorization } = require('../middlewares/auth')

route.get('/', TaskController.getTasks)
route.post('/', TaskController.createTask)

route.get('/categories', TaskController.getCategories)
// route.post('/categories', TaskController.getCategories)

route.put('/:id', authorization, TaskController.updateTask)
route.delete('/:id', authorization, TaskController.deleteTask)

module.exports = route
