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
            res.status(401).json('User Not Auth')
        }
    } catch (err) {
        console.log(err);
        res.status(401).json('User Not Auth')
    }
}

const authorization = async (req, res, next) => {
    try {
        const found = await Task.findByPk(req.params.id)

        if(found === null) {
            res.status(404).json('404 Not Found')
        } else {
            if(found.UserId == req.userData.id) {
                next()
            } else {
                res.status(403).json('Forbidden Access')
            }
        } 
    } catch (err) {
        res.status(500).json('Interval Server Error')
    }
}

module.exports = {
    authentication,
    authorization
}
