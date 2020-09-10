const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync()

const comparePassword = (password, hash) => {
    let hasValid = bcrypt.compareSync(password, hash)
    return hasValid
}

const createHash = (password) => {
    return bcrypt.hashSync(password, salt)
}

module.exports = { createHash, comparePassword }