const route = require('express').Router()
const controller = require('../controllers/BoardController')
const { authentication } = require('../middlewares/auth')

route.get('/:orgId', authentication ,controller.showAllBoard)
route.post('/:orgId', authentication ,controller.createBoard)

module.exports = route