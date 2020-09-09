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
                    return res.status(401).json({message: "User not authenticated!"})
                }
            })
    } catch(err) {
        return res.status(401).json({message: "User not authenticated!"})
    }
}




module.exports = { authentication }