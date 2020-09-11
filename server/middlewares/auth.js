const { verifyToken } = require("../helpers/jwt.js");
const { User, Task, Category } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;

  try {
    const userData = verifyToken(access_token);
    console.log(userData, "this is userData");

    let user = await User.findOne({
      where: {
        email: userData.email
      }
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "User is not authenticated", statusCode: 401 };
    }
  } catch(err) {
    console.log("<<<< error in authentication");
    return next(err);
  }
}

const authorization = async (req, res, next) => {
  console.log("this is authorization");
  try {
    const task = await Task.findByPk(+req.params.id);
    if (task === null) {
      throw { message: "Not Found", statusCode: 404 };
    } else if (task && task.UserId === +req.userData.id) {
      next();
    } else {
      throw { message: "Unauthorized Access", statusCode: 403 };
    }
  } catch(err) {
    console.log("<<<< error in authorization");
    return next(err);
  }
}

module.exports = { authentication, authorization };