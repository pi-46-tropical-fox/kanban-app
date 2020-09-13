const bcrypt = require('bcryptjs')

const hashPass = (user) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    return hash
}

const verifyHash = (password, oldPassword) => {
    const comparedHash = bcrypt.compareSync(password, oldPassword)

    return comparedHash
}

module.exports = {
    hashPass,
    verifyHash
}