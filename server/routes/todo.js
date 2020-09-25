const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')

const router = require('express').Router()


router.get('/', TodoController.show)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.editTodo)
router.put('/:id', authorization, TodoController.editPostTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router