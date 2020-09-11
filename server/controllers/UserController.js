const { User } = require('../models')
const comparePassword = require('../helpers/comparePass')
const { generateToken } = require('../helpers/jwt')
// const { OAuth2Client } = require('google-auth-library');

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body

        User.create({name, email, password})
        .then(user => {
            const {name, email} = user
            return res.status(201).json({name, email})
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(user => {
            // console.log(user);
            if (user) {
                let valid = comparePassword(req.body.password, user.password)
                if (valid) {
                    const access_token = generateToken(user)
                    return res.status(200).json({name: user.name, email: user.email, access_token})
                }
            }
        })
        .catch(err => {
            return next(err)
        })
    }

//     static GoogleLogin(req, res, next) {
//         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//         const {google_access_token} = req.headers
//         let email_google = ''
//         client.verifyIdToken({
//             idToken: google_access_token,
//             audience: process.env.GOOGLE_CLIENT_ID
//         })
//         .then(ticket => {
//             return ticket.getPayload()
//         })
//         .then(payload => {
//             // console.log(payload);
//             email_google = payload.email
//             return User.findOne({where: {email: payload.email}})
//         })
//         .then(user => {
//             if (!user) {
//                 let userObj = {
//                     email: email_google,
//                     password: 'p455wordku4l4y'
//                 }
//                 return User.create(userObj)
//             } else {
//                 return user
//             }
//         })
//         .then(user => {
//             const access_token = generateToken(user)

//             return res.status(200).json({access_token})
//         })
//         .catch(err => {
//             return next(err)
//         })
//     }
}




module.exports = UserController