const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


function generateToken (user) {
    return jwt.sign({ id: user.id, name: user.name, email:user.email }, secret) 
}

function verifyToken (token) {
    return jwt.verify(token, secret)

}

// console.log(verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1OTk3MjQwNzB9.f0VAjtjozNPPFv8iG2cv23rrBxccbsA4gn8ZIL2bFbs'))

module.exports = { generateToken, verifyToken }