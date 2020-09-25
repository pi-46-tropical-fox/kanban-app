const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const TaskController = require('../controllers/TaskController.js')
const { authentication, authorization } = require('../middlewares/auth')
const CategoryController = require('../controllers/CategoryController.js')

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication)
// Category
router.get('/category', CategoryController.getCategory)
router.put('/category/:taskId', authorization, CategoryController.switchCategory)

// Task
router.get('/task', TaskController.showTasks)
router.post('/task', TaskController.addTask)
router.get('/task/:taskId', authorization, TaskController.getTaskById)
router.put('/task/:taskId', authorization, TaskController.updateTask)
router.delete('/task/:taskId', authorization, TaskController.deleteTask)

module.exports = router;