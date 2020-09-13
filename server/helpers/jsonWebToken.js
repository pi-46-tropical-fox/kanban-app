const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

function signToken(data) {
    const {id,email} = data
    return jwt.sign({id,email}, secret)
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}


module.exports = {
    signToken, verifyToken
};
