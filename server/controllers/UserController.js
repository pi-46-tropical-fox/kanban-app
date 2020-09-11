const {User} = require('../models')

const {compareBcrypt, hashingPassword} = require('../helpers/bcrypt.js')
const {generateToken, verifyToken} = require('../helpers/jwt.js')
const {OAuth2Client} = require('google-auth-library');

class TaskController {

    static async register(req,res,next) {
        try {
            const {username,email,password} = req.body

            if (username.includes(' ')) {
                throw {statusCode: 400, msg: "invalid username(must alphanumeric)"}
            }

            const user = await User.create({username,email,password})

            let payload = {id: user.id, username:user.username}
            
            return res.status(201).json(payload)

        } catch(err) {
            return next(err)
        }
    }
    
    static async login(req,res,next) {
        try {
            const {username,password} = req.body
  

            const user = await User.findOne({where: {username}})

            if(!user) {
                throw {statusCode: 400, msg: "invalid username or password"}
            }
            const isValid = await compareBcrypt(password, user.password)
            if(isValid) {
                const access_token = generateToken(user)

                return res.status(200).json({access_token,id:user.id, username: user.username })
            } else {
                throw {statusCode: 400, msg: "invalid username or password"}
            }
        } catch(err) {
            return next(err)
        }
    }

    static async googleLogin(req,res,next){
        try{

            const client = new OAuth2Client(process.env.CLIENT_GOOGLE);

            const  {google_id_token} = req.headers
            let email_by_google = ''
            const ticket = await client.verifyIdToken({
                idToken: google_id_token,
                audience: process.env.CLIENT_GOOGLE, 
            })
            let payload = ticket.getPayload();
            email_by_google = payload.email
            let tempUsername = email_by_google.split('@')

            let username = tempUsername[0]

            let user = await User.findOne({
                where: {email: payload.email}
            })
            if(!user) {
                var userObj = {
                    username,
                    email: email_by_google,
                    password: 'accessbygoogle'
                }
               user = await User.create(userObj)
            } 
            
            const payloadGoogle = {
                email: user.email,
                id: user.id
                }
            const access_token = generateToken(payloadGoogle)

            return res.status(200).json({access_token,id:user.id,username})
            
        }catch(err) {
            return next(err)
        }
    }


}

module.exports = TaskController