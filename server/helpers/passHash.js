var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function passHash(pass){
  let hash = bcrypt.hashSync(pass, salt);
  return hash
}

module.exports= passHash