const { validateToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = await validateToken(access_token)

        User.findOne({
            where: {
                email: userData.email
            }
        })
            .then(user => {
                if(user) {
                    req.userData = userData
                    next()
                }else {
                    throw {message: 'User not authenticated!', statusCode: 401}
                }
            })
    } catch(err) {
        return next(err)
    }
}

const authorization = async (req, res, next) => {
    const { id } = req.params

    try {
        const task = await Task.findByPk(id)

        if(task && task.UserId === req.userData.id) {
            next()
        }else {
            throw {message: 'User not authenticated!', statusCode: 401}
        }
    } catch (err) {
        console.log(err)
        return next(err)
    }    
}



module.exports = { authentication, authorization }