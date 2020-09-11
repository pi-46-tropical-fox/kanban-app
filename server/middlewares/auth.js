const { verifyToken } = require('../helpers/jwt')
const { Task, User } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = verifyToken(access_token)
        // console.log(userData);
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        
        if (user) {
            req.userData = userData
            next()
        } else {
            throw {message: 'User not authenticated', statusCode: 401}
        }
    } 
    catch(err) {
        return next(err)
    }
}


const authorization = (req, res, next) => {
    const {id} = req.params

    Task.findByPk(id)
    .then(task => {
        if(!task) {
            throw {message: 'Task Not Found', statusCode: 404}
        } 
        else if(task.UserId == req.userData.id) {
            next()
        } 
        else {
            throw {message: 'No access', statusCode: 403}
        }
    })
    .catch(err => {
        return next(err)
    })
}

module.exports = { authentication, authorization }  