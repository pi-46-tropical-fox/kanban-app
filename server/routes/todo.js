const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')

const router = require('express').Router()


router.get('/', TodoController.show)
router.post('/add', TodoController.add)
router.get('/edit/:id', authorization, TodoController.edit)
router.put('/edit/:id', authorization, TodoController.editPost)
router.delete('/delete/:id', authorization, TodoController.delete)

module.exports = router