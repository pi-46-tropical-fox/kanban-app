const router = require('express').Router()
const kanbanRouter = require('./kanban.js')
const userRouter = require('./user.js')
const {authentication} = require('../middlewares/auth.js')
const KanbanController = require('../controllers/KanbanController.js')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/', userRouter)
// router.use(authentication)
router.use('/', kanbanRouter)
router.get('/', KanbanController.getProjects)

module.exports = router