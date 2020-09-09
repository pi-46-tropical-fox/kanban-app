const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const TaskController = require('../controllers/TaskController.js')
const OrganizationController = require('../controllers/OrganizationController.js')
const { authentication, authorization } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
// Organization
router.get('/organization', authorization, OrganizationController.showOrganization)
router.post('/organization', authorization, OrganizationController.addOrganization)

router.get('/:organizationId/task', authorization, TaskController.showTasks)
router.post('/:organizationId/task', authorization, TaskController.addTask)
router.get('/:organizationId/task/:taskId', authorization, TaskController.getTaskById)
router.put('/:organizationId/task/:taskId', authorization, TaskController.updateTask)
router.delete('/:organizationId/task/:taskId', authorization, TaskController.deleteTask)

module.exports = router;