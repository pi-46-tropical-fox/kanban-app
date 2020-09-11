const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const { generateRandomStrings } = require('../helpers/randomizer')

class AuthController{
    static async login(req, res, next) {
        try {
            let { username, password } = req.body

            let user = await User.findOne({ where: {username} })

            if(user && compareHash(password, user.password)){
                let { id, name, email } = user.email
                req.app.locals.payload = { id, name, email }

                return AuthController.sign(req, res, next)
            } else {
                throw { code: 401, message: "Oops! Wrong username and/or password." }
            }
        } catch (e) {
            return next(e)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            let code = 200
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const { g_access_token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: g_access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            let user = await User.findOne({ where: { email: payload.email } })

            if(!user){
                req.app.locals.body = {
                    name: payload.name,
                    username: payload.email,
                    email: payload.email,
                    picture: payload.picture,
                    password: generateRandomStrings(20, false)
                }

                // to redirect POST requests
                res.redirect(307,'/auth/register')
            } else {
                let { picture } = payload
                let { id, name, email } = user

                req.app.locals.payload = { id, name, email, picture }

                return AuthController.sign(req, res, next)
            }
        } catch (e) {
            return next(e)
        }
    }

    static async sign(req, res, next) {
        try {
            let payload = req.app.locals.payload
            let code = req.app.locals.code || 200
            let access_token = generateToken(payload)

            res.status(code).json({access_token, ...payload})
        } catch (e) {
            console.log(e);
            return next(e)
        }
    }
}

module.exports = AuthController