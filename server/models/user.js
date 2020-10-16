'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcryptjs')

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
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail : {
          args : true,
          msg : 'Invalid email!'
        }
      },
      unique : {
        args : true,
        msg : 'Email must be unique!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        len : {
          args : [4],
          msg : 'Minimum password is four characters!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};