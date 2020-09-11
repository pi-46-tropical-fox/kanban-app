const router = require('express').Router()
// const UserController = require('../controllers/UserController.js')
const KanbanController = require('../controllers/KanbanController.js')

router.get('/kanban', KanbanController.getProjects)

router.get('/kanban/:id', KanbanController.getCategories)
router.post('/kanban/:id', KanbanController.postCategory)
router.put('/kanban/:id', KanbanController.updateCategory)
router.delete('/kanban/:id', KanbanController.deleteCategory)


router.post('/kanban/:id/tasks', KanbanController.postTask)


// router.put('/kanban/:id', KanbanController.updateTask)
router.get('/kanban/:id/tasks/:id', KanbanController.getTask)
router.put('/kanban/:id/tasks/:id', KanbanController.updateTask)
router.delete('/kanban/:id/tasks/:id', KanbanController.deleteTask)


module.exports = router