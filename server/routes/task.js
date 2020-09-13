const route = require('express').Router()
const controller = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

route.post('/:categoryId', authentication ,controller.createTask)
route.get('/:id', authentication ,controller.findDetail)
route.delete('/:id', authentication, authorization ,controller.deleteTask)
route.put('/:id', authentication ,controller.updateTaskPos)
route.put('/all/:id', authentication, authorization ,controller.updateTask)

module.exports = route