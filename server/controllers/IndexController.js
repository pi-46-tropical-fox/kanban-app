const { User, Task } = require("../models");
const { generateToken } = require("../helpers/jwt.js");
const { checkPassword } = require("../helpers/bcrypt.js");
const { OAuth2Client } = require("google-auth-library");

class IndexController {

  static async showHome (req, res, next) {
    try {
      return res.send("Welcome to Kanban App");
    } catch(err) {
      console.log(err, "<<<< error in showHome IndexController");
      return next(err);
    }
  }

  static async register (req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password
      });
      const access_token = generateToken(user);
      return res.status(201).json({ access_token: access_token, email: user.email });
    } catch(err) {
      console.log(err, "<<<< error in register IndexController");
      return next(err);
    }
  }

  static async login (req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        throw { message: "Invalid email or password", statusCode: 400 };
      }
      const isValid = checkPassword(req.body.password, user.password);
      if (isValid) {
        const access_token = generateToken(user);
        return res.status(200).json({ access_token: access_token, email: user.email });
      } else {
        throw { message: "Invalid email or password", statusCode: 400 };
      }
    } catch(err) {
      console.log(err, "<<<< error in login IndexController");
      return next(err);
    }
  }

  static async googleLogin (req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { google_access_token } = req.headers;
    try {
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.CLIENT_ID
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const getUserName = payload.name;
      const google_email = payload.email;
      const profile_picture = payload.picture;
      
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        const userObj = {
          username: getUserName,
          email: payload.email,
          password: "fullstack"
        };
        const addUser = await User.create(userObj);
      } else {
        const access_token = generateToken(user);
        return res.status(200).json({ access_token, avatar: profile_picture, email: google_email });
      }
    } catch(err) {
      console.log(err, "<<<< error in googleLogin IndexController");
      return next(err);
    }

  }
}

module.exports = IndexController;