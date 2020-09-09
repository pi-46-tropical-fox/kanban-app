const { User } = require('../models')


class UserController{
    static async register(req, res){
        const { email, password, name } = req.body

        console.log(email, password, name)

        let result = await User.create({email, password, name})
        console.log(result)
    }

    static async login(req, res){

    }
}

module.exports = UserController
