const routes = require(`express`).Router()
const UserRts = require(`./UserRts`)
const TaskRts = require(`./TaskRts`)
const CategoryRts = require(`./CategoryRts`)

routes.use(`/`, UserRts)
routes.use(`/`, TaskRts)
routes.use(`/`, CategoryRts)

module.exports = routes