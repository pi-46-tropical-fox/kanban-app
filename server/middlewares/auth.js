const { verifyToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

const authentication = async function(req, res, next) {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        let user = await User.findOne({where: {email: userData.email}})
        if (user) {
            req.userData = userData
            next();
        } else {
            return res.status(401).json({message: 'User not authenticated'})
        }
    }
    catch(err) {
        console.log(err, "<<<< ini error authentication")
        return res.status(500).json({message: 'Internal Sever Error'})
    }
}
const authorization = async function(req, res, next) {
    try {
        const {taskId}= req.params
        const task = await Task.findByPk(taskId)
        if (task && task.UserId == req.userData.id) {
            next()
        } else {
            return res.status(403).json({message: 'User Not Authorized'})
        }
        // next()
    }
    catch(err) {
        console.log(err, '<<<< error Authorization')
        return res.status(403).json({message: 'Forbidden Access'})
    }
}

module.exports = { authentication, authorization }