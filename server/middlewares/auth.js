const { verifyToken, generateToken } = require('../helpers/jwt')
const { Task, User } = require('../models')

const authentication  = async (req,res,next) =>{
    const { access_token } = req.headers
    try {
        const { email, id, organization } = verifyToken(access_token)
        let user = await User.findAll({where:{email}})
        if(user){
            req.userData = { email, id, organization }
            console.log(req.userData,'ini data')
            next()
        }else{
            throw{msg : 'User Not Authenticated', statusCode:401}
        }
    } catch (err) {
        console.log(err.name,'Not Authenticated (catch)')
        // res.status(401).json({msg : 'User Not Authenticated'})
        return next(err)
    }
}

const authorization = (req,res,next) =>{
    Task.findOne({where:{id: req.params.id}})
    .then(data =>{
        if(data && data.UserId === req.userData.id){
            console.log('succes')
            next()
        }else{
            // return res.status(401).json({msg:'Forbidden Access'})
            throw{msg:'Forbidden Access', statusCode: 401}
        }
    })
    .catch(err =>{
        // return res.status(400).json({msg:'Bad request'})
        return next(err)
    })
}


module.exports = { authentication, authorization }
