const route = require('express').Router()
const controller = require('../controllers/TaskController')
const { authentication } = require('../middlewares/auth')

route.post('/:categoryId', authentication ,controller.createTask)
route.get('/:id', authentication ,controller.findDetail)
route.delete('/:id', authentication, controller.deleteTask)
route.put('/:id', authentication, controller.updateTaskPos)

module.exports = route