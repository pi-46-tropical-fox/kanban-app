const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const compare = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
// require('dotenv').config()

class UserController {
    static register(req,res) {
        let params = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(params)
        .then(result => {
            return res.status(201).json({
                id: result.id,
                email: result.email
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({msg: 'Internal Server Error'})
        })
    }
    static login(req,res) {
        let {email,password} = req.body
        User.findOne({where:{email}})
        .then(result => {
            if (!result) return res.status(401).json({msg: 'Invalid email/password'})
            else return result
        })
        .then(result => {
            const validation = compare(password, result.password)
            if (validation) {
                let payload = {
                    id: result.id,
                    email: result.email
                }
                let access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token,
                    id: result.id,
                    email: result.email
                })
            } else {
                return res.status(400).json({msg:'Internal server error'})
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({msg: 'Internal server error'})
        })
    }
    static googleLogin(req,res,next) {
        console.log(process.env.GOOGLE_CLIENT_ID);
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google = ''
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload);
            email_google = payload.email
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if (!user) {
                let params = {
                    email: email_google,
                    password: 'defaultgoogle'
                }
                return User.create(params)
            } else {
                return user
            }
        })
        .then(user => {
            const accessToken = generateToken({email: user.email, id: user.id})
            res.status(200).json({accessToken: accessToken})
        })
        .catch(err => console.log(err))

    }
}

module.exports = UserController