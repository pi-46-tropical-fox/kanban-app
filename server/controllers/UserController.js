const { User } = require('../models')
const { verifyHash } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/token')

class Controller {
    static async login(req, res) {
        try {
            const { email, password } = req.body

            const findUser = await User.findOne({ where: { email } })

            if (findUser) {
                const validatePassword = verifyHash(password, findUser.password)

                if (validatePassword) {
                    const token = generateToken({email, id : findUser.id, name : findUser.name})

                    res.status(200).json({access_token : token})
                } else {
                    res.send(401).json(`Email / Password Salah`)
                }
            } else {
                res.send(401).json(`Email / Password Salah`)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(`Interval Server Error`)
        }
    }

    static async register(req, res) {
        try {
            const { email, name, password } = req.body

            await User.create({ email, name, password })

            res.status(201).json({ email, name })
        } catch (err) {
            console.log(err);
            res.status(500).json('Interval Server Error')
        }
    }
}

module.exports = Controller