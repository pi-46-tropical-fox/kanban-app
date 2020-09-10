const router = require ("express").Router ()
const TaskController = require ("../controllers/TaskController.js")
const {authentication} = require ("../middlewares/authentication.js")
const {authorization} = require ("../middlewares/authorization.js")

router.post ("/", authentication, TaskController.addTask)
router.get ("/", authentication, TaskController.getTask)

router.put ("/:id", authentication, authorization, TaskController.editTask)
router.delete ("/:id", authentication, authorization, TaskController.deleteTask)

module.exports = router