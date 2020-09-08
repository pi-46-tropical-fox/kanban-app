const router = require('express').Router()
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

//REGISTER
router.post('/register', UserController.register)

//LOGIN
router.post('/login', UserController.login)

//ENDPOINTS
router.get('/tasks', authentication, TaskController.show)
router.post('/tasks', authentication, TaskController.add)
router.get('/tasks/:id', authentication, authorization, TaskController.find)
router.put('/tasks/:id', authentication, authorization, TaskController.edit)
router.delete('/tasks/:id', authentication, authorization, TaskController.delete)

module.exports = router