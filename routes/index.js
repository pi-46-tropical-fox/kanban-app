const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const TaskController = require('../controllers/TaskController.js')
const OrganizationController = require('../controllers/OrganizationController.js')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication)
// Organization
router.get('/organization', OrganizationController.showOrganization)
router.post('/organization/:organizationId', OrganizationController.joinOrganization)
router.post('/organization', OrganizationController.addOrganization)

// Task
router.get('/:organizationId/task', TaskController.showTasks)
router.post('/:organizationId/task', TaskController.addTask)
// router.get('/:organizationId/task/:taskId', TaskController.getTaskById)
// router.put('/:organizationId/task/:taskId', TaskController.updateTask)
// router.delete('/:organizationId/task/:taskId', TaskController.deleteTask)
// router.get('/:organizationId/task', authorization, TaskController.showTasks)
// router.post('/:organizationId/task', authorization, TaskController.addTask)
router.get('/:organizationId/task/:taskId', authorization, TaskController.getTaskById)
router.put('/:organizationId/task/:taskId', authorization, TaskController.updateTask)
router.delete('/:organizationId/task/:taskId', authorization, TaskController.deleteTask)

module.exports = router;