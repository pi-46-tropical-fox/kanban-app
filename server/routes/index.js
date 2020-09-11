const router = require("express").Router();
const usersRoutes = require("./usersRoutes");
const tasksRoutes = require("./tasksRoutes");

router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);

module.exports = router;