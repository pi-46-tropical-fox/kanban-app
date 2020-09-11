const { verifyToken } = require('../helpers/jwt')
const { Task, User } = require('../models')

const authentication = async (req, res, next) => {
    // console.log(req.headers, 'ini req.headers')
    const { access_token } = req.headers

    try {
        const userData = verifyToken(access_token)
        // req.useruserData = userData
        let user = await User.findOne({ where: { email: userData.email } })
        if (user) {
            req.userData = userData
            next()
        } else {
            throw { message: 'User authentication failed' }
        }
    } catch (err) {
        // res.status(401).json({ message: 'User authentication failed' })
        console.log(err, 'ini error authentication')
        next(err)
    }
}

const authorization = async (req, res, next) => {
    const { taskId } = req.params
    console.log(taskId, '<<<di authorization')
    try {
        const task = await Task.findByPk(taskId)
        console.log(req.userData.id, '<<<ini req.userData di authorization')
        console.log(task.UserId, '<<<ini task.UserId')
        if (task && task.UserId === req.userData.id) {
            next()
        } else {
            return res.status(403).json({ message: 'Forbidden access' })
        }
    }
    catch {
        return res.status(403).json({ message: 'Forbidden access' })
    }
}

module.exports = { authentication, authorization}