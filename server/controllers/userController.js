const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let options = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(options)
        .then(data => {
            if (data) {
                let hasValid = comparePass(req.body.password, data.password)
                if (hasValid) {

                    const access_token = generateToken(data)
                    res.status(200).json({ access_token })
                } 
                else {
                    throw { message: 'Invalid username or password', statusCode: 400 }
                }
            } 
            else {
                throw { message: 'Invalid username or password', statusCode: 400 }
            }
        })
        .catch(err => {
            return next(err)
        })

    }
    
}

module.exports = UserController