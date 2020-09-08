const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { authentication, authorization } = require('../middlewares/auth')

router.post('/', authentication, TaskController.addTask)
router.get('/', authentication,TaskController.showAllTask)
router.get('/:id', authentication, authorization,TaskController.detailTask)
router.put('/:id', authentication, authorization,TaskController.editTask)
router.delete('/:id', authentication, authorization,TaskController.deleteTask)


module.exports = router