const { verifyToken } = require('../helpers/jwt')
const { User, Task, Organization } = require('../models')

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
        if (!req.params.organizationId) {
            const organization = await Organization.findOne({where: {UserId: req.userData.id}})
            if (organization) {
                next()
            } else {
                return res.status(403).json({message: 'User Not Authorization'})
            }
        }
        else {
            // const { organizationId } = req.params
            // const { id } = req.userData.id
            // console.log(req.userData)
            // console.log(organization)
            const organization = await Organization.findOne({where: {id: req.params.organizationId}})
            const task = await Task.findOne({where: {organizationId: organization.id}})
            if ((task && task.organizationId == organization.id) && (organization.UserId == req.userData.id)) {
                next()
            } else {
                return res.status(403).json({message: 'User Not Authorization'})
            }
        }
    }
    catch(err) {
        console.log(err)
        return res.status(403).json({message: 'Forbidden Access'})
    }
}

module.exports = { authentication, authorization }