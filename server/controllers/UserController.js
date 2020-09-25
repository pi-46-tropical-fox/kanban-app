const { User } = require('../models')
const {validate} = require('../helpers/validateUser')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')


class UserController {
    static register(req,res,next) {
        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then( user => {
                console.log(user)
                return res.status(201).json({message: "Success create User"})
            })
            .catch(err => {
                return next(err)
            })

    }

    static login(req,res,next) {
        let params = {
            email : req.body.email,
            password : req.body.password
        }

        User.findOne({where: {email: params.email}})
        .then(user => {
            if(!user) {
                throw {message : "invalid email or password", statusCode : 401}
            }
            
            return user    
        })
        .then( user => {
            let isValid  = validate(params.password,user.password)

            if(isValid) {
                let access_token = generateToken(user)
                return res.status(200).json({access_token, id: user.id, name: user.name, organization: user.organization})
            }
            else {
                throw {message : "invalid email or password", statusCode : 401}
            }

        })
        .catch(err => {
            return next(err)
        })

        
    }

    static googleLogin(req,res,next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const { google_token } = req.headers
        const data = {} 

        client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            return payload
        })
        .then(payload => {
            
            data.name = payload.name
            data.email = payload.email
            data.password = 'random123'
            
            return User.findOne({where : { email : data.email}})
        })
        .then ( user => {
            if(!user) {
                return User.create(data)
            } else {
                return user
            }
        })
        .then ( user => {
            const access_token = generateToken(user)
            return res.status(200).json({access_token, name: user.name, organization: user.organization})
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
    }


}

module.exports = UserController

// router.post('/register', UserController.register)
// router.post('/login', UserController.login)
// router.post('/googleLogin', UserController.googleLogin)