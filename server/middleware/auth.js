const { verifyToken } = require("../helper/jwt");
const { User, Task } = require('../models');


const authentication = (req, res, next) => {
    const { access_token } = req.headers
    let userData = verifyToken(access_token);
    const { email } = userData;
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (user) {
            req.userData = userData;
            next();
        } else {
            res.status(400).json({ message: 'User is not authenticated' })
        }
    }).catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
    })
}

const authorization = (req, res, next) => {
    const { id } = req.params;
    Task.findOne({ where: { id } })
        .then(task => {
            if (task && task.UserId == req.userData.id) {
                next()
            } else {
                res.status(400).json({ message: 'User is not authorizedå' })
            }
        }).catch(err => {
            res.status(500).json({ message: 'Internal Server Error' })
        })
}




module.exports = {
    authentication,
    authorization
}