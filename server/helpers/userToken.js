let jwt = require('jsonwebtoken');
let secret = process.env.SECRET


function generateToken(userData){
  console.log(secret);
  const { id, email, name } = userData
  let token = jwt.sign({ id, email, name },  secret);
  return token
}
function verifyToken(token){
  let decoded = jwt.verify(token, secret);
  return decoded
}


module.exports= {generateToken, verifyToken}