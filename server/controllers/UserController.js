const {User} = require('../models')

const {compareBcrypt, hashingPassword} = require('../helpers/bcrypt.js')
const {generateToken, verifyToken} = require('../helpers/jwt.js')

class TaskController {

    static async register(req,res,next) {
        try {
            const {username,email,password} = req.body

            if (username.includes(' ')) {
                throw {statusCode: 400, msg: "invalid username(must alphanumeric)"}
            }

            const user = await User.create({username,email,password})

            let payload = {id: user.id, username:user.username}
            
            return res.status(201).json(payload)

        } catch(err) {
            return next(err)
        }
    }
    
    static async login(req,res,next) {
        try {
            const {username,password} = req.body

            const user = await User.findOne({where: {username}})
            console.log(user,'ini user');
            if(!user) {
                throw {statusCode: 400, msg: "invalid username or password"}
            }
            const isValid = await compareBcrypt(password, user.password)

            if(isValid) {
                const access_token = generateToken(user)

                return res.status(200).json({access_token,id:user.id, username: user.username })
            } else {
                throw {statusCode: 400, msg: "invalid username or password"}
            }
        } catch(err) {
            return next(err)
        }
    }




}

module.exports = TaskController