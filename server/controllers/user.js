const { User } = require('../models')
const { tokenGenerator } = require('../helpers/jwt')
const { isValid } = require('../helpers/bcrypt')

class UserController {
    static async register (req, res, next) {
        try {
            const {email, password, orgId} = req.body
            const user = await User.create({
                email, password, orgId
            })
            
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            return next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user || !isValid(password, user.password)) {
                throw {message: 'wrong username/password', status: 400}
            }

            const access_token = tokenGenerator(user)
            res.status(200).json({
                id: user.id,
                email: user.email,
                access_token
            })
        } catch (err) {
            res.json(err)
        }
    }

    static googleLogin (req, res, next) {

    }
}

module.exports = {
    UserController
}