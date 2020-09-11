'use strict';
const {
  Model
} = require('sequelize');
const { generate_bcrypt_hash } = require("../helpers/bcrypt");
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
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username must not be empty."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must not be empty."
        },
        isEmail: {
          args: true,
          msg: "Please use proper email format."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must not be empty."
        },
        len: {
          args: [6],
          msg: "Password must be at least 6 characters long."
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
    user.password = generate_bcrypt_hash(user.password);
  });
  return User;
};