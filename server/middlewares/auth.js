const { decodeToken } = require('../helpers/token')
const { User, Task } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        console.log(req.headers);
        const decoded = decodeToken(access_token)
        const userFind = await User.findOne({where : {email : decoded.email}})

        if(userFind) {
            req.userData = decoded
            next()
        } else {
            throw { message : 'User Not Authenticated', statusCode : 401 }
        }
    } catch (err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    try {
        const found = await Task.findByPk(req.params.id)

        if(found === null) {
            throw { message : '404 Not Found', statusCode : 404 }
        } else {
            if(found.UserId == req.userData.id) {
                next()
            } else {
                throw { message : 'Forbidden', statusCode : 403 }
            }
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}
