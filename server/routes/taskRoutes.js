const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const {authorization, authentication} = require('../middlewares/auth')

router.get('/', TaskController.show)
router.post('/', TaskController.add)
router.put('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router

