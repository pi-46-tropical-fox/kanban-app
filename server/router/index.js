const router = require('express').Router()
const kanbanRouter = require('./kanban.js')
// const userRouter = require('./user.js')
const {authentication} = require('../middlewares/auth.js')
const KanbanController = require('../controllers/KanbanController.js')
const UserController = require('../controllers/UserController.js')

router.get('/', (req, res) => {
  res.send('Welcome to Kanban App!')
})

// router.use('/', userRouter)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.use(authentication)
router.use('/kanban', kanbanRouter)
// router.get('/', KanbanController.getProjects)

module.exports = router