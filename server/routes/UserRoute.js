const router = require ("express").Router ()
const UserController = require ("../controllers/UserController.js")

router.post ("/register", UserController.registerUser)
router.post ("/login", UserController.loginUser)
router.post ("/googleLogin", UserController.googleLogin)

router.put ("/:id", UserController.editUser)
router.delete ("/:id", UserController.deleteUser)

module.exports = router