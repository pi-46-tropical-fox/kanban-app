const { User } = require('../models')
const comparePassword = require('../helpers/comparePass')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body

        User.create({name, email, password})
        .then(user => {
            const {name, email} = user
            return res.status(201).json({name, email})
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(user => {
            // console.log(user);
            if (user) {
                let valid = comparePassword(req.body.password, user.password)
                if (valid) {
                    const access_token = generateToken(user)
                    return res.status(200).json({name: user.name, email: user.email, access_token})
                }
            }
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = UserController