const router = require ("express").Router ()

const UserRoute = require ("./UserRoute.js")
const TaskRoute = require ("./TaskRoute.js")
const CategoryRoute = require ("./CategoryRoute.js")

router.get ("/", (req, res, next) => {
    res.json ({message : "Welcome to home"})
})

router.use ("/tasks", TaskRoute)
router.use ("/users", UserRoute)
router.use ("/categories", CategoryRoute)

module.exports = router