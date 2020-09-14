const router = require("express").Router()
const users = require("./users")
const tasks = require("./tasks")
const categories= require("./categories")

const { authentication } = require("../middlewares/auth")


router.get("/", function(req, res){
  res.send("Welcome to Kanban API")
})

router.use("/users", users)

router.use(authentication)

router.use("/tasks", tasks)
router.use("/categories", categories)


module.exports = router