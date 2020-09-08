const bcrypt = require('bcryptjs');

const hash = (pass) => {
    let salt = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(pass, salt);
    return hashed
}

const comparePass = (inputPass, DBPass) => {
    return bcrypt.compareSync(inputPass, DBPass)
}



module.exports = { hash, comparePass };