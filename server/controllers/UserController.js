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

}

module.exports = UserController