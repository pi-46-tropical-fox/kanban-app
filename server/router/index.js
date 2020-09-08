const router = require('express').Router()
const taskRouter = require('./task.js')
const userRouter = require('./user.js')
const {authentication} = require('../middlewares/auth.js')
const Task = require('../controllers/TaskController.js')

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.use('/', userRouter)
router.use(authentication)
router.use('/', taskRouter)
router.use('/', Task.getTasks)

module.exports = router