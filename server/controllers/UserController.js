const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../helpers/jwt.js')

class UserController{

    static register(req, res, next) {
        const { email, password, fullName, role } = req.body
        User.create({ email, email, password, fullName, role })
            .then(user => {
                const { email, fullName, role } = user
                res.status(201).json(user)
            })
            .catch(err => {
                console.log(err, ' <=== error register')
                res.status(500).json({ message: "internal error server" })
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    // return res.status(400).json({ message: 'invalid email/password' })
                    throw {message:'invalid email/password', statusCode:400 }
                }
                return user
            })
            .then(user => {
                const isValid = bcryptjs.compareSync(password, user.password)
                if (isValid) {
                    //generate jwt
                    const access_token = generateToken(user)
                    return res.status(200).json({ access_token })
                }
                else {
                    throw {message:'invalid email/password', statusCode:400 }
                }
            })
            .catch(err => {
                console.log(err, '<=== error login')
                return next(err)
                // return res.status(500).json({ message: 'Internal error server' })
            })
    }

    // static editProfile(req, res, next) {}

}

module.exports = UserController