const { User, Membership } = require('../models')
const { verifyHash } = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/token')
const { OAuth2Client } = require('google-auth-library');

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            const findUser = await User.findOne({ where: { email } })

            if (findUser) {
                const validatePassword = verifyHash(password, findUser.password)

                if (validatePassword) {
                    const token = generateToken({email, id : findUser.id, name : findUser.name})

                    res.status(200).json({access_token : token})
                } else {
                    throw { message : 'Email / Password Is Incorrect' , statusCode : 401}
                }
            } else {
                throw { message : 'Email / Password Is Incorrect' , statusCode : 401}
            }
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, name, password } = req.body

            const user = await User.create({ email, name, password })
            await Membership.create({UserId : user.id, OrganizationId : 1, role: 'member'})

            res.status(201).json({ email, name })
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const { id_token } = req.headers
            
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });

            const payload = ticket.getPayload();
            
            const userFind = await User.findOne({where : {email : payload.email}})

            if(userFind) {
                const cred = {
                    name : userFind.name,
                    email : userFind.email,
                    id : userFind.id
                }

                const token = generateToken(cred)

                res.status(200).json({access_token : token})
            } else {
                const userCred = {
                    name: payload.name,
                    email : payload.email,
                    password : process.env.GOOGLE_PASS_CRED
                }

                const user = await User.create(userCred)
                await Membership.create({UserId : user.id, OrganizationId : 1, role: 'member'})
                // diulang supaya klo user google blm ada bisa langsung masuk tanpa reload
                const token = generateToken({email : user.email, id : user.id, name : user.name})

                res.status(200).json({access_token : token})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller