const {verifyToken} = require('../helpers/jwt.js')
const {Category,Task,User} = require('../models')


const authentication = async (req, res, next) => {
    const {access_token} = req.headers
    
    try {
        const userData = verifyToken(access_token)
        
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        
        
        if (user) {
            req.userData = userData
            req.userData.username = user.username
            req.userData.ProjectId = 1 //asumsi hanya ada 1 project
            
            next()
        } else {
            throw {msg: "User not authenticated", statusCode: 401}
        }

    } catch(err) {
        return next(err)
    }
}


const authorization = async (req, res, next) => {
    
    const {id} = req.params

    try {
        const task = await Task.findByPk(id) 
        
            if(task && task.UserId == req.userData.id) {
                next()
            } else {
                throw  {msg: "forbidden access", statusCode: 403}
            }

    } catch(err) {
        return next(err) 
    }
}

module.exports = {authentication,authorization}