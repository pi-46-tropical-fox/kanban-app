const routes = require(`express`).Router()
const {UserCtr} = require(`../controllers`)

routes.post(`/register`, UserCtr.register)
routes.post(`/login`, UserCtr.login)
routes.post(`/google`, UserCtr.logingoogle)

module.exports = routes