'use strict'

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword (password) {
  return bcrypt.hashSync(password, salt)
}

function checkPassword (password, hashPassword) {
  // console.log(password);
  return bcrypt.compareSync(password, hashPassword)
}


module.exports = { 
  hashPassword, 
  checkPassword 
}