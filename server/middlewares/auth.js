const {User, Task} = require(`../models`)
const {verify_token} = require(`../helpers`)

module.exports = {
    authentication: async (req, res, next) => {
        try{
            const userData = verify_token(req.headers.access_token)
            const user = await User.findOne({where: {email: userData.email}})
            if(user){
                req.userData = userData
                next()
            } else {
                throw { message: "User not authenticate", statusCode: 401}
            }
        } catch(err) {
            return next(err)
        }
    },

    authorization: async (req, res, next) => {
        const id = req.params.id
        try{
            const task = await Task.findByPk(id)
            if(!task){
                throw { message: "Not Found", statusCode: 404}
            }
            if(task.UserId !== req.userData.id) {
                throw { message: "Forbidden Access", statusCode: 403}
            }
            return next()
        } catch(err) {
            return next(err)
        }
    }
}