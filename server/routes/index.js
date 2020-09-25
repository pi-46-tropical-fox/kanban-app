const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/googleSignIn', Controller.googleSignIn)

router.use(authentication)

router.post('/tasks', Controller.addTask)
router.get('/tasks', Controller.getTasks)
router.get('/tasks/:id', authorization, Controller.getOneTask)
router.put('/tasks/:id', authorization, Controller.editTask)
router.delete('/tasks/:id', authorization, Controller.deleteTask)

module.exports = router