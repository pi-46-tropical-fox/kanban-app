const router = require('express').Router()
const UserController = require('../controllers/userController')
const TaskController = require('../controllers/TaskController')
const CategoryController = require('../controllers/catogoryController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/googleLogin', UserController.googleLogin)

router.get('/tasks', authentication, TaskController.show)
router.post('/tasks/:CategoryId', authentication, TaskController.create)
router.get('/tasks/:id', authentication, authorization, TaskController.find)
router.put('/tasks/:id', authentication, authorization, TaskController.edit)
router.delete('/tasks/:id', authentication, authorization, TaskController.delete)

router.post('/category', authentication, CategoryController.create)

module.exports = router 


