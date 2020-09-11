const { User } = require('../models')
const { verifyPassword } = require('../helpers/password')

const { signToken } = require('../helpers/jwt')

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;

class UserController{
    static async register(req, res, next){
        try{
            const { email, password, name } = req.body

            let result = await User.create({email, password, name})
            
            res.status(201).json({
                id : result.id,
                email : result.email,
                name
            })
        } catch (e){
            next(e)
        }
    }

    static async googleLogin(req, res, next) {
		const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);
		const { google_access_token } = req.body;

		try {
			const ticket = await client.verifyIdToken({
				idToken: google_access_token,
				audience: GOOGLE_OAUTH_CLIENT_ID,
			});

			const payload = ticket.getPayload();
            
			const name = payload.name || payload.email.split('@')[0] + Math.ceil(Math.random() * 100).toString();

			let user = await User.findOne({
				where: {
					email: payload.email,
				},
			});

			if (!user) {
				user = await User.create({
					name, email: payload.email, password: 'a1a1a1a1a1a1',
				});
			}

			const access_token = signToken({ id: user.id });

			res.status(200).json({ access_token, name: user.name, email: user.email });
		} catch (err) {
			next(err);
		}
	}

    static async login(req, res, next){
        try{
            const { email, password } = req.body
        
            let user = await User.findOne({
                where : {
                    email
                }
            })
            
            if(user){
                let flag = await verifyPassword(user.password, password)
             
                if(flag){
                    const token = signToken({id : user.id, email : user.email})
        
                    res.status(200).json({
                        access_token : token,
                        name : user.name,
                        email : user.email
                    })
                } else {
                    // TODO:
                    throw { statusCode : 400, message : 'Email/Password combination not found' }
                }
            } else {
                throw { statusCode : 400, message : 'Email/Password combination not found' }
            }
        }catch(e){
            next(e)
        }
    }
}

module.exports = UserController
