const router = require('express').Router()
const TaskController = require('../controllers/taskController')

router.use(authentication)
router.get('/', TaskController.show)
router.post('/', TaskController.add)
router.put('/:id', authorization,TaskController.update)
router.put('/move/:id', authorization, TaskController.move)
router.delete('/:id', authorization, TaskController.delete)
router.get('/:id', TaskController.findOne)

module.exports = router

