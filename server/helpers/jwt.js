"use strict"

const jwt = require('jsonwebtoken')
const secret = 'rahasia'


function generateToken(user){
    const access_token = jwt.sign(
        {email:user.email, id:user.id}, secret);
        return access_token
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

module.exports= {generateToken, verifyToken}