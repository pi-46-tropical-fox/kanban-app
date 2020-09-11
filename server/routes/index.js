const router = require('express').Router()
const UserController = require('../controllers/UserController')
const {authentication} = require('../middleware/auth')
const taskRouter = require('./task')
const categoryRouter = require('./category')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

router.get('/', (req, res) => {
    res.send('home')
})

router.use('/categories',categoryRouter)
router.use('/tasks',taskRouter)

module.exports = router