const {User} = require(`../models`)
const {compare, access_token} = require(`../helpers`)
const {OAuth2Client} = require('google-auth-library');

class Controller{
    static async register(req, res, next){
        const {email, password} = req.body
        try{
            const user = await User.create({email, password})
            return res.status(201).json({
                message: "Successfully created user"
            })
        } catch(err) {
            return next(err)
        }
    }

    static async login(req, res, next){
        const {email, password} = req.body
        const error = { message: "Wrong Email or Password", statusCode: 401}
        try{
            const user = await User.findOne({where: {email}})
            if(!user){
                throw error
            }

            const isValid = compare(password, user.password)
            if(isValid){
                const token = access_token(user.email, user.id, user.organization)
                return res.status(200).json({
                    data: {
                        id: user.id,
                        email: user.email,
                        organization: user.organization
                    },
                    access_token: token
                })
            } else {
                throw error
            }
        } catch(err) {
            console.log(err)
            return next(err)
        }
    }

    static logingoogle(req, res, next){
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { google_access_token } = req.headers
        let email_google, username
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            email_google = payload.email
            username = payload.name
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if (!user) {
                return User.create({
                    email: email_google,
                    username,
                    password: 'password'
                })
            } else {
                return user
            }
        })
        .then(user => {
            const token = access_token(user.email, user.id, user.organization)
            return res.status(200).json({access_token: token, username: user.username})
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }
}

module.exports = Controller