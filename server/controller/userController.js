const { User } = require('../models')
const { createHash, compareHash } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class Controller{
    static register(req,res,next){
        let params = {
            email : req.body.email,
            password : req.body.password,
            organization : req.body.organization
        }
        User.create(params)
        .then(data =>{
            let user = {id:data.id, email:data.email, organization:data.organization}
            return res.status(201).json(user)
        })
        .catch(err =>{
            return next(err)
        })
    }
    
    static login(req,res,next){
        let {email, password} = req.body
        User.findOne({where:{email}})
        .then(data =>{
            if(!data){
                throw {message: "invalid email or password", statusCode: 400}
            }else{
                if(compareHash(password, data.password)){
                    console.log(data.id)
                    const user= {email: email, id:data.id, organization: data.organization}
                    const access_token = generateToken(user)
                    console.log(access_token, 'ini token')
                    return res.status(200).json({access_token})
                }else{
                    // return res.status(401).json({message:'invalid email or password'})
                    throw {message: "invalid email or password", statusCode: 400}
                }
            }
        })
        .catch(err =>{
            return next(err)
        })
    }

    static googleLogin(req,res,next){
        let email, googleData;
        const client = new OAuth2Client('360618096035-a2o6lethnqssmh344ehadh8qteggmbvc.apps.googleusercontent.com')
        const { google_access_token } = req.headers
        client.verifyIdToken({
                idToken: google_access_token,
                audience: '360618096035-a2o6lethnqssmh344ehadh8qteggmbvc.apps.googleusercontent.com'
            })
            .then(ticket => {
                return ticket.getPayload()
            })
            .then(payload => {
                googleData = payload;
                console.log(payload)
                email = payload.email
                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                if (!user) {
                    let obj = {
                        email: email,
                        password: 'randompasswordforgoogleuser'
                    }
                    return User.create(obj)
                } else {
                    return user
                }
            })
            .then(user => {
                const data = {id:user.id, email:user.email, organization:'Hacktiv8'}
                const access_token = generateToken(data)
                console.log(access_token)
                return res.status(200).json({ access_token, email })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
}

module.exports = Controller