const { verifyToken }= require('../helpers/jwt')
const { User, Todo } = require ('../models')


function authentication (req, res, next) {
    const payload = verifyToken(req.headers.access_token)
    

    User.findOne({where : { email: payload.email }})
        .then( user => {
            if(!user) {
                throw {message : "Invalid email or password", statusCode: 401}
            } else {
                console.log(payload)
                req.headers = payload
                next()
            }
        })
        .catch ( err => {
            console.log(err)
            return next(err)
        })
}

function authorization (req, res, next) {
    const id = req.params.id
    const UserId = req.headers.id

    Todo.findOne({where: { id }})
        .then ( todo => {
            console.log(todo.UserId === UserId)
            if ( todo && todo.UserId === UserId) {
                next()
            } else {
                throw {message: "Forbidden Access", statusCode: 403}
            }
        })
        .catch( err => {
            return next(err)
        })
}

module.exports = { authentication, authorization }