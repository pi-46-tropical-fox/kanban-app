const route = require('express').Router()
const { UserController } = require('../controllers/user')
const { TaskController } = require('../controllers/task')
const { OtherController } = require('../controllers/others')
const { authenticate, authorize } = require('../middlewares/auth')

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.get('/statuses', OtherController.getStatuses)

route.use(authenticate)
route.get('/tasks', TaskController.getTasks)
route.post('/tasks', TaskController.new)

route.use('/tasks/:id*', authorize)
route.put('/tasks/:id/:movement', TaskController.move)
route.patch('/tasks/:id', TaskController.edit)
route.delete('/tasks/:id', TaskController.delete)

module.exports = route