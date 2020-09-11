const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.JWT);

    return token
}

const decodeToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT);

    return decoded
}

module.exports = {
    generateToken,
    decodeToken
}