const { User } = require('../models')
const AuthController = require('./AuthController')

class UserController{
    static async register(req, res, next) {
        try {
            let data = null
            let signedThroughGoogle = false

            if(req.app.locals.body){
                signedThroughGoogle = true
                data = req.app.locals.body
            } else {
                data = {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            }

            let user = await User.create(data)

            let { id, name, email } = user

            if(signedThroughGoogle){
                let picture = data.picture
                req.app.locals.code = 201
                req.app.locals.payload = { id, name, email, picture }

                return AuthController.sign(req, res, next)
            }

            return res.status(201).json({ message: `Successfully registered with email ${req.body.email}` })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = UserController