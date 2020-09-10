'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/bcrypt')
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
      unique: true,
      validate: {
        isEmail:{
          args: true,
          msg : 'Wrong Email format'
        },
        notEmpty: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg : 'Password cannot be empty'
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.organization = 'Hacktiv8'
      }
    },
    sequelize,
    modelName: 'User',
  });
  
  User.beforeCreate((user, options) => {
    let hash = createHash(user.password);
    user.password = hash
  })

  return User;
};