const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'secret'

function signToken(payload){
    return jwt.sign(payload, secret)
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

module.exports = { verifyToken, signToken }
