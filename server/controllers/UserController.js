const {User} = require("../models")
const { checkPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
    static register(req,res,next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            organization: ''
        })
        .then(user=>{
            return res.status(201).json({id:user.id, name:user.name, email:user.email})
        })
        .catch(err=>{
            if(err.errors[0].message === 'email must be unique'){
                err.errors[0].message = 'email already exists'
            }
            let eror = {
                name: 'Validator User',
                message: err.errors[0].message
            }
            console.log(err)
            return res.status(500).json(eror)
        })
    }
    static login(req,res,next){
        console.log(req.body)
        User.findOne({where:{email:req.body.email}})
        .then(user=>{
            if(user){
                let valid = checkPassword(req.body.password, user.password)
                if(valid){
                    let access_token = generateToken(user)
                    return res.status(200).json({id:user.id,name:user.name,access_token})
                }else{
                    return res.status(400).json({message: 'invalid email or password'})
                }
            }else{
                return res.status(400).json({message: 'invalid email or password'})
            }
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static googleLogin(req,res,next){
        
    }
}

module.exports = UserController