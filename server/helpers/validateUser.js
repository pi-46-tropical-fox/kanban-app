const bcrypt = require('bcryptjs')


function createHash(password) {

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
}


function validate(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {createHash, validate}


