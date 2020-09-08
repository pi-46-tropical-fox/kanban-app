'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
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
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'name must be filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'email must be filled'
        },
        isEmail:{
          msg: 'please insert email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'password must be filled'
        },
        len:{
          args: [6],
          msg: 'password minimum 6 characters'
        }
      }},
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    user.organization = 'Hacktiv8'
  });

  return User;
};