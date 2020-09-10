const { User } = require("../models");
const { comparePass } = require('../helper/bcrypt');
const { generateToken } = require("../helper/jwt")

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
                res.status(500).json({ messae: 'Internal Server Error' })
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
                        res.status(200).json({ access_token })
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
}


module.exports = UserController