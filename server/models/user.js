'use strict';
const {
  Model
} = require('sequelize');
const {hashing} = require(`../helpers`)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "Email can not be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 16],
          msg: "Password must be minimum four character maximum sixteen character"
        },
        notEmpty: {
          args: true,
          msg: "Password can not be empty"
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opt) => {
    user.password = hashing(user.password)
    user.organization = "Hacktiv8"
  })
  return User;
};