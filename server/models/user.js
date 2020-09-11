'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          args: "Username cannot be left blank!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Please insert a valid email!"
        },
        notEmpty: {
          args: true,
          args: "Email cannot be left blank!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,15],
          msg: "password must be between 8 to 15 characters!"
        },
        notEmpty: {
          args: true,
          args: "Password cannot be left blank!"
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.organization = "Hacktiv8";
    user.password = hashPassword(user.password);
  });
  return User;
};