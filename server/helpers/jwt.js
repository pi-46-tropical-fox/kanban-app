const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET


function generateToken(user) {
    const access_token = jwt.sign({ id: user.id, name: user.name, email:user.email, organization:user.organization, pictureUrl: user.pictureUrl }, secret)

    return access_token
}

const validateToken = (access_token) => {
    var decoded = jwt.verify(access_token, secret)

    return decoded
}

module.exports = { generateToken, validateToken }