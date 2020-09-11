const {User} = require("../models")
const { checkPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library')

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
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google
        let firstname_google
        let lastname_google
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload)
            email_google = payload.email
            firstname_google = payload.given_name
            lastname_google = payload.family_name
            return User.findOne({where:{email:payload.email}})
        })
        .then(user=>{
            if(!user){
                return User.create({
                    name: `${firstname_google}  ${lastname_google}`,
                    email: email_google,
                    password: 'password'
                })
            }else{
                return user
            }
        })
        .then(user=>{
            const payload = {email:user.email, id: user.id, name: user.name}
            const access_token = generateToken(payload)

            return res.status(200).json({id:user.id,name:user.name,access_token})
        })
        .catch(err=>{
            // next(err)
            console.log(err)
        })
    }
}

module.exports = UserController