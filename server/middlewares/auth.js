const { User, Task } = require('../models')
const { verifyToken } = require('../helpers/jwt')


async function authentication(req, res, next){
    try{
        const { access_token } = req.headers

        if(!access_token){
            throw { message : 'Not Authenticated', code : 403 }
        }
    
        const jwtPayload = verifyToken(access_token)
        
        const { id } = jwtPayload
     
        let user = await User.findOne({
            where : {
                id
            }
        })

        if(user){
            req.userId = id
        } else {
            throw { message : 'Not Authenticated', code : 403}
        }
        
        next()
    } catch (e){
        next(e)
    }
}

async function authorization(req, res, next){
    try{
        const { id } = req.params
        const task = await Task.findOne({ where : { id }, include : [User]})

        if(task.User.id === req.userId){
            next()
            return
        }
        
        throw { message : 'Unauthorized', statusCode : 401 }
        

    } catch(e){
        next(e)
    }
}

module.exports = { authentication, authorization }
