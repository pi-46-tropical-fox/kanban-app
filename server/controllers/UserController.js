const { User } = require('../models')
const { verifyPassword } = require('../helpers/password')

const { signToken } = require('../helpers/jwt')

class UserController{
    static async register(req, res, next){
        const { email, password, name } = req.body

        console.log(email, password, name)

        let result = await User.create({email, password, name})
        
        res.status(201).json({
            id : result.id,
            email : result.email
        })
    }

    static async login(req, res, next){
        const { email, password } = req.body
        
        let user = await User.findOne({
            where : {
                email
            }
        })
        
        if(user){
            let flag = await verifyPassword(user.password, password)
         
            if(flag){
                const token = signToken({id : user.id, email : user.email})
    
                res.status(200).json({
                    access_token : token,
                    name : user.name,
                    email : user.email
                })
            } else {
                // TODO:
                res.status(400).json({})
            }
        } else {
            //User not found
            res.status(400).json({})
        }
    }
}

module.exports = UserController
