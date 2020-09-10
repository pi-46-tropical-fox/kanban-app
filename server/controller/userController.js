const { User } = require('../models')
const { createHash, compareHash } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')


class Controller{
    static register(req,res,next){
        let params = {
            email : req.body.email,
            password : req.body.password,
            organization : req.body.organization
        }
        User.create(params)
        .then(data =>{
            let user = {id:data.id, email:data.email, organization:data.organization}
            return res.status(201).json(user)
        })
        .catch(err =>{
            return next(err)
        })
    }
    
    static login(req,res,next){
        let {email, password} = req.body
        User.findOne({where:{email}})
        .then(data =>{
            if(!data){
                throw {message: "invalid email or password", statusCode: 400}
            }else{
                if(compareHash(password, data.password)){
                    console.log(data.id)
                    const user= {email: email, id:data.id, organization: data.organization}
                    const access_token = generateToken(user)
                    console.log(access_token, 'ini token')
                    return res.status(200).json({access_token})
                }else{
                    // return res.status(401).json({message:'invalid email or password'})
                    throw {message: "invalid email or password", statusCode: 400}
                }
            }
        })
        .catch(err =>{
            return next(err)
        })
    }
}

module.exports = Controller