const bcrypt = require('bcryptjs')

async function hashPassword(password){
    const salt = await bcrypt.genSalt(2)
    return bcrypt.hash(password, salt)
}

async function verifyPassword(hash, password){
    return bcrypt.compare(password, hash)
}

module.exports = { hashPassword, verifyPassword }