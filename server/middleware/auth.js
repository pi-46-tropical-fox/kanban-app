const { verifyToken } = require('../helpers/jwt')
const { Organization, Project, List, Task, Comment, User } = require('../models')

const authentication = async (req, res, next) => {
    const path = req.originalUrl.split('/').slice(1)

    try {
        let payload = verifyToken(req.headers.access_token)

        let user = await User.findByPk(payload.id)

        if (path.join('.') === 'auth.check') {
            if (user) {
                return res.status(200).json({ authenticated: true })
            } else {
                return res.status(401).json({ authenticated: false })
            }
        }
        else {
            if (user) {
                req.user = user

                next()
            } else {
                throw { code: 401, message: "Unauthorized" }
            }
        }
    } catch (e) {
        if (path.join('.') === 'auth.check') {
            return res.status(401).json({ authenticated: false })
        } else next(e)
    }
}

const authorization = async (req, res, next) => {
    const baseRoute = req.originalUrl.split('?')[0].split('/')[1]

    try {
        // let user = await User.findByPk(req.userData.id)

        switch (baseRoute) {
            case 'organizations':
                break
            case 'collaborators':
                break
            case 'projects':
                break
            case 'lists':
                break
            case 'tasks':
                break
            case 'comments':
                break
            default:
                throw { code: 400, message: "Bad request occurred." }
        }

        next()
    } catch (e) {
        console.log(e);
        next(e)
    }
}

module.exports = { authentication, authorization }