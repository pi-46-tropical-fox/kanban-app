const { User } = require('../models')
const comparePassword = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController{
    static register(req, res, next){
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            organization: "Hacktiv8",
            pictureUrl: req.body.pictureUrl ||'https://www.w3schools.com/w3images/avatar6.png'
        }

        User.create(userObj)
            .then(data => {
                const { id, name, email, organization } = data
                return res.status(200).json({ id, name, email, organization })
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }

                const flag = comparePassword(req.body.password, data.password)

                if(flag) {
                    const access_token = generateToken(data)
                    const { id, name, organization } = data
                    return res.status(200).json({access_token, id, name, organization})
                }else {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google = ''
        let name_google = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            return ticket.getPayload();
        })
        .then(payload => {
            console.log('payload>>>>', payload, '<<<payload')
            email_google = payload.email
            name_google = payload.name
            return User.findOne({
                where: {
                    email: email_google
                }
            })
        })
        .then(user => {
            if(!user) {
                let objUser = {
                    name: name_google,
                    email: email_google,
                    password: 'passgoogle',
                    organization: "Hacktiv8",
                    pictureUrl: 'https://www.w3schools.com/w3images/avatar6.png'
                }

                return User.create(objUser)
            }else {
                return user
            }
        })
        .then(user => {
            const access_token = generateToken(user)
            const { id, name, organization} = user
            
            return res.status(200).json({ access_token })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }


}

module.exports = UserController