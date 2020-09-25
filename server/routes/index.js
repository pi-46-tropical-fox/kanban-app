const ControlUser  = require('../controllers/userControl')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const router = require('express').Router()

router.post('/register', ControlUser.register )
router.post('/login', ControlUser.login)
router.post('/googleLogin', ControlUser.googleLogin)

router.get('/',ControlUser.getTask)
router.use(authentication)

router.post('/',ControlUser.postTask)
router.get('/:id',ControlUser.findOne)
router.put('/:id',ControlUser.putTask)
router.delete('/:id',ControlUser.deleteTask)

module.exports = router