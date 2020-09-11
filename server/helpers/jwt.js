const jwt = require('jsonwebtoken')
secret = process.env.SECRET

function generateToken(user){
    let token = jwt.sign({id:user.id,email:user.email,name:user.name}, secret);
    return token
}

function verifyToken(token){
    let decoded = jwt.verify(token, secret)
    return decoded
}

module.exports = {generateToken, verifyToken}