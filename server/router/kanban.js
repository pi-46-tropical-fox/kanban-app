const router = require('express').Router()
// const UserController = require('../controllers/UserController.js')
const KanbanController = require('../controllers/KanbanController.js')

router.get('/kanban', KanbanController.getProjects)
router.get('/kanban/:id', KanbanController.getCategories)
router.post('/kanban/:id', KanbanController.postTask)

// router.put('/kanban/:id', KanbanController.updateTask)
router.get('/kanban/:id/task/:id', KanbanController.getTask)
router.put('/kanban/:id/task/:id', KanbanController.updateTask)
router.delete('/kanban/:id/task/:id', KanbanController.deleteTask)


module.exports = router