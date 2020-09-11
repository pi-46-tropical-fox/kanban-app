const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync()

const compareHash = (p, hash) => {
    return bcrypt.compareSync(p, hash)
}

const createHash = (p) => {
    return bcrypt.hashSync(p, salt)
}

module.exports = { compareHash, createHash }