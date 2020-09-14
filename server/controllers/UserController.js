const bcrypt = require('bcryptjs')
const {User} = require ("../models")

const {generateToken} = require ("../helpers/jwt.js")
const {valid} = require ("../helpers/bcrypt.js")

class UserController {

    static registerUser (req, res, next) {
        let params = {
            email : req.body.email,    
            password : req.body.password
        }

        User.create (params)

        .then (data => {
            res.status (201).json (data)
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })
    }

    static loginUser (req, res, next) {
        let {email, password} = req.body

        User.findOne ({
            where : {email}
        })

        .then (data => {
            if (!data) {
                // console.log ("error1")
                return res.status (400).json ({message : "Invalid Email or Password"})
            }
            return data
        })

        .then (data => {
            console.log (password, data.password)
            const validPassword = valid (password, data.password)

            if (validPassword) {
                let payload = {id : data.id, email : data.email, organization : data.organization}

                let access_token = generateToken (payload)

                return res.status (200).json ({access_token})

            } else {
                // console.log ("error2")
                return res.status (400).json ({message : "Invalid Email or Password"})
            }
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })

    }

    static editUser (req, res, next) {

        let salt = bcrypt.genSaltSync (10)
        let hash = bcrypt.hashSync (req.body.password, salt)

        let payload = {
            email : req.body.email,
            password : hash,
            organization : req.body.organization
        }

        User.update (payload, {
            where : {id : req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (404).json ({message : "Data is Not Found"})
            
            } else {
                return res.status (200).json ({message : "Data has been Updated"})
            }
        })

        .catch (err => {
            console.log (err)
            return res.status (400).json ({message : "Bad Request"})
        })

    }

    static deleteUser (req, res, next) {
        User.destroy ({
            where : {id : req.params.id}
        })

        .then (data => {
            if (!data) {
                return res.status (404).json ({message : "Data is Not Found"})

            } else {
                return res.status (200).json ({message : "Data has been Deleted"})
            }          
        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : "Internal Server Error"})
        })



    }

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {google_id_token} = req.headers
        let username_google = ''
        let email_google = ''

        client.verifyIdToken({
            idToken: google_id_token,
            audience: process.env.CLIENT_ID,    // Specify the CLIENT_ID of the app that accesses the backend
                                    // Or, if multiple clients access the backend:
                                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })

        .then (ticket => {
            return ticket.getPayload()
        })

        .then (payLoad => {
            console.log (payLoad)
            username_google = payLoad.given_name
            email_google = payLoad.email
            return User.findOne ({where : {email : payLoad.email}})
        })

        .then (user => {
            if (!user) {
                let params = {
                    username : username_google,
                    email : email_google,
                    password : "admin"
                }
                return User.create (params)
            
            } else {
                return user
            }
        })

        .then (user => {
            const payLoad = {id : user.id, email : user.email}
            const google_token = tokenGenerator (payLoad)

            return res.status (200).json ({token : google_token}) 
        })

        .catch (err => {
            // console.log (err)
            return next(err)
        })

    }

}

module.exports = UserController