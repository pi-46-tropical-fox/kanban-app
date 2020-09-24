const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res) {
        const { email, password } = req.body
        try {
            await User.create({email, password})
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
    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {google_access_token} = req.headers
        let email_google ='';
        let given_name='';
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then (payload => {
            email_google = payload.email
            given_name = payload.given_name
            return User.findOne({where: {email: payload.email}})
        })
        .then (user => {
            if (!user) {
                const obj = {
                    email: email_google,
                    password: 'random'
                }
                return User.create(obj)
            }
            else {
                return user;
            }
        })
        .then(user => {
            const payload = {email: user.email, id:user.id}
            const access_token =  generateToken(payload)
            return res.status(200).json({access_token})
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController