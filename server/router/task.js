const router = require('express').Router()
// const UserController = require('../controllers/UserController.js')
const KanbanController = require('../controllers/KanbanController.js')

router.get('/kanban', KanbanController.getProjects)
router.get('/kanban/:id', KanbanController.getCategories)

module.exports = router