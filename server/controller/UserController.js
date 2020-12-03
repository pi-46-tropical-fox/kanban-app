const { User } = require("../models");
const { comparePass } = require('../helper/bcrypt');
const { generateToken } = require("../helper/jwt");
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password,
            organization: req.body.organization
        }
        User.create(params)
            .then(data => {
                const output = {
                    id: data.id,
                    email: data.email,
                    organization: data.organization
                }
                res.status(201).json({ Data: output })
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal Server Error' })
            })
    }

    static login(req, res) {
        const { email, password } = req.body;
        console.log(req.body, '<<< ini dari controller')
        User.findOne({
                where: { email }
            })
            .then(user => {
                if (user) {
                    let verified = comparePass(password, user.password)
                    if (verified) {
                        const access_token = generateToken(user);
                        res.status(200).json({ access_token, email })
                    } else {
                        console.log('masuk sini gak verifies')
                        res.status(400).json({ message: 'Email/Password is invalid.' })
                    }
                } else {
                    console.log('masuk sini ga ada user')
                    res.status(400).json({ message: 'Email/Password is invalid.' })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({ messae: 'Internal Server Error' })
            })
    }

    static googleLogin(req, res) {
        let email, googleData;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const { google_access_token } = req.headers
        client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.CLIENT_ID
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
                const access_token = generateToken(user)
                return res.status(200).json({ access_token, email })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
}


module.exports = UserController