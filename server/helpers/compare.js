var bcrypt = require('bcryptjs')

const compare = (inputpass,pass)=>{
    let isValid = bcrypt.compare(inputpass,pass)
    return isValid
}

module.exports = compare