const { verifyToken } = require('../helpers/jwt')
const { User, Task, UserOrganizationTask } = require('../models')

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
        const conjunction = await UserOrganizationTask.findOne({where: {OrganizationId: req.params.organizationId, UserId: req.userData.id}})
        if (!conjunction) {
            return res.status(403).json({message: 'User Not Authorization<<'})
        } else next()
        // const task = await Task.findOne({where: {id: conjunction.TaskId}})
        // if (task) {
        //     next()
        // } else {
        //     return res.status(403).json({message: 'User Not Authorization'})
        // }
    }
    catch(err) {
        console.log(err, '<<<< error Authorization')
        return res.status(403).json({message: 'Forbidden Access'})
    }
}

module.exports = { authentication, authorization }