const route = require('express').Router()
const controller = require('../controllers/CategoryController')
const { authentication } = require('../middlewares/auth')

route.get('/:boardId', authentication ,controller.showAll)
route.post('/:boardId', authentication ,controller.createCategory)

module.exports = route