const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hashPassword(data) {
    return bcrypt.hashSync(data, salt);
}

function comparePassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
    hashPassword,comparePassword
};

