const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res) {
        const { email, password } = req.body
        try {
            const user = await User.create({email, password})
            return res.status(201).json({email})
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async login(req, res) {
        const { email, password }  = req.body
        try {
            const user = await User.findOne({where: {email}})
            if (!user) {
                return res.status(400).json({message: "Invalid Email Adress"})
            }
            const isValid = comparePassword(password, user.password)
            if (!isValid) {
                return res.status(400).json({message: "Invalid Password"})
            }
            const access_token = generateToken({email, id: user.id})
            return res.status(200).json({access_token})
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = UserController