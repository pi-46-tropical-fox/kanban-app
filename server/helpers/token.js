const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(data, 'shhhhh');

    return token
}

const decodeToken = (token) => {
    const decoded = jwt.verify(token, 'shhhhh');

    return decoded
}

module.exports = {
    generateToken,
    decodeToken
}