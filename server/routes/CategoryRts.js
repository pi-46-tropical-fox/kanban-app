const routes = require(`express`).Router()
const {CategoryCtr} = require(`../controllers`)
const {authentication} = require(`../middlewares/auth`)

routes.get(`/categories`, authentication, CategoryCtr.getAllCategory)
routes.post(`/categories`, authentication, CategoryCtr.add)

module.exports = routes