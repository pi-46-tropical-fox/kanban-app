const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (data) => {
    return jwt.sign(data, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, verifyToken }