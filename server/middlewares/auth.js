const { User, Task } = require('../models')
const { verifyToken } = require("../helpers/jwt")

const authenticate = async (req, res, next) => {
    try {
        const access_token = req.headers.access_token
        const user = verifyToken(access_token)
        const found = await User.findOne({
            where: {
                email: user.email
            }
        })
    
        if (found) {
            req.userData = user
            next()
        } else {
            throw {message: 'User not authenticated', status: 401}
        }
    } catch (err) {
        next(err)
    }
}

const authorize = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id)

        if (!task) {
            throw {message: 'Task not found', status: 404}
        }

        if (task.userId == req.userData.id) {
            next()
        } else {
            throw {message: 'User not authorized.', status: 403}
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate,
    authorize
}