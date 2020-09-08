const { decodeToken } = require('../helpers/token')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
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

module.exports = {
    authentication
}
