
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLECLIENTID)

class GoogleLoginController {
    static async verifyLogin(req, res, next){
        try{
            const { google_access_token } = req.headers
            let ticket = await client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.GOOGLECLIENTID
            })
            const payload = ticket.getPayload()
            console.log(payload)
            let userData = await User.findOne({where: {email:payload.email}})
            if(userData) {
                const data = {
                    id:userData.id,
                    fullName: userData.fullName,
                    email: userData.email,
                    role: userData.role
                }
                let access_token = generateToken(data)
                res.status(200).json({access_token})
            } else {
                let newGoogleUser = await User.create({
                    email: payload.email,
                    fullName: payload.given_name,
                    password: 'fjsdnvjisn',
                    role: ''
                })
                let access_token = generateToken(newGoogleUser)
                res.status(200).json({access_token})
            }
        } catch {
            res.status(500).json(err)
        }
    }
}

module.exports = GoogleLoginController