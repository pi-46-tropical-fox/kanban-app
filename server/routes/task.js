const router = require('express').Router()
const {authorization} = require('../middleware/auth')
const TaskController = require('../controllers/TaskController')

router.get('/', TaskController.showAllTask)
router.post('/:categoryId', TaskController.createNewTask)
router.get('/:taskId', authorization, TaskController.findTaskById)
router.put('/:taskId', authorization, TaskController.updateTask)
router.put('/:taskId/:categoryId', authorization, TaskController.moveTaskCategory)
router.delete('/:taskId', authorization, TaskController.deleteTask)

module.exports = router