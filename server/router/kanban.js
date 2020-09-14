const router = require('express').Router()

const {authorization} = require('../middlewares/auth.js')
const KanbanController = require('../controllers/KanbanController.js')

router.get('/', KanbanController.getProjects)

router.get('/:id', KanbanController.getCategories)
router.post('/:id', KanbanController.postCategory)
router.put('/:id', KanbanController.updateCategory)
router.delete('/:id', KanbanController.deleteCategory)


router.get('/:id/tasks/:id', KanbanController.getTask)


router.post('/:id/tasks', KanbanController.postTask)

router.put('/:id/tasks/:id', authorization, KanbanController.updateTask)
router.put('/:id/tasks/:id/move', authorization, KanbanController.moveTask)
router.put('/:id/tasks/:id/back', authorization, KanbanController.backTask)
router.delete('/:id/tasks/:id', authorization, KanbanController.deleteTask)


module.exports = router