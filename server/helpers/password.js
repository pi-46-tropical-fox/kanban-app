const bcrypt = require('bcryptjs')

async function hashPassword(password){
    const salt = await bcrypt.genSalt(2)
    return bcrypt.hash(password, salt)
}

async function verifyPassword(hash, password){
    return bcrypt.compare(password, hash)
}

function validatePassword(password){
    console.log(password, 'from validatepass')
    // throw new Error('Jangan jangan')
}

module.exports = { hashPassword, verifyPassword, validatePassword }
