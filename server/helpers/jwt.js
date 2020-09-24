const jwt = require(`jsonwebtoken`)

module.exports = {
    access_token: (email, id, organization) => {
        return jwt.sign({email, id, organization}, process.env.JWT_SECRET)
    },

    verify_token: (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}