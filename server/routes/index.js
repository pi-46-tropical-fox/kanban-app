const UserController = require('../controllers/UserController')
const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

const route = require('express').Router()

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googlelogin',UserController.googleLogin)

route.get('/tasks', authentication, Controller.getTask)
route.post('/tasks', authentication, Controller.createTask)
route.get('/tasks/:id', authentication, authorization, Controller.getTaskById)
route.put('/tasks/:id', authentication, authorization, Controller.updateTask)
route.delete('/tasks/:id',  Controller.deleteTask)

module.exports = route