const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const generateToken = (user) => {
  const access_token = jwt.sign({ username: user.username, email: user.email, id: user.id, organization: user.organization }, secret);
  return access_token;
}

const verifyToken = (token) => {
  const verified = jwt.verify(token, secret);
  return verified;
}

module.exports = { generateToken, verifyToken };