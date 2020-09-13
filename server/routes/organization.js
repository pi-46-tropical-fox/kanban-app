const route = require('express').Router()
const controller = require('../controllers/OrganizationController')
const { authentication } = require('../middlewares/auth')

route.get('/', authentication ,controller.showAllOrganization)
route.post('/', authentication ,controller.createOrganization)
route.get('/my', authentication ,controller.ownOrganization)

module.exports = route