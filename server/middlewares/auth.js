const { verifyToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        if (user) {
            req.userData = userData
            next()
        } else {
            throw { message: 'Doesnt recognize User!', statusCode: 401 }
        }

    } catch(err) {
       return next(err)
    }
}

const authorization = async (req, res, next) => {
    const { id } = req.params

    try {
        const task = await Task.findByPk(id)
        if (task && task.UserId === req.userData.id) {
            next()
        } else {
            throw ({ message: `Forbidden Access`, statusCode: 403})
        }

    } catch(err) {
        return next(err)

    }

}

module.exports = { authentication, authorization }