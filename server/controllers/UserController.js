const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {signToken} = require('../helpers/jsonWebToken');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register(req,res,next) {
        const {email,password} = req.body

        try {
            const data = await User.create({
                email,password
            })
            res.status(201).json({id:data.id,email:data.email,organization:data.organization})
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next) {
        const {email,password} = req.body

        try {
            const data = await User.findOne({where: {email}})
            if(!data) {
                throw {message: "Username/password invalid", statusCode:400}
            } else {
                const isValid = comparePassword(password, data.password)

                if(isValid) {
                    let access_token = signToken(data)
                    res.status(200).json({access_token})
                } else {
                    throw {message: "Username/password invalid", statusCode:400}
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req,res,next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const {google_access_token} = req.headers
        console.log(google_access_token, 'google access token');

        let email_google = ""
        let profile_picture = ""
        
        client
        .verifyIdToken({
            idToken : google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            console.log(ticket,'<<<< ini ticket');
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload)
            email_google = payload.email
            profile_picture = payload.picture;
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if(!user) {
                const userObj = {
                    email:email_google,
                    password:"randomaja"
                }
                return User.create(userObj)
            } else {
                return user
            }
        })
        .then(user => {
           const payload = {email:user.email,id:user.id}
           console.log(payload,'<<<<<<< ini payload');
           const access_token = signToken(payload) 

           return res.status(200).json({access_token,avatar:profile_picture,email:email_google})
        })
        .catch(err => {
           next(err)
        })
    }

}

module.exports = UserController
