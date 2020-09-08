const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, organization: user.organization }, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}


module.exports = {
    generateToken,
    verifyToken
}