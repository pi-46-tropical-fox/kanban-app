const router = require('express').Router()
const user = require('./user')
const todo = require('./todo')
const category = require('./category')
const { authentication } = require('../middlewares/auth')

router.use('/', user)

router.use(authentication)
router.use('/todos', todo)
router.use('/categories', category)

module.exports = router