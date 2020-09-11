'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
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
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    } ,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        checkPassword(value){
          if(value.length < 6){
            throw new Error(`Password at least 6 characters`) 
          }
        }
      }
    } ,
    organization: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, salt)
        if(user.organization.trim() === ''){
          user.organization = 'Hacktiv8'
        }  
      }
    }
  });
  return User;
};