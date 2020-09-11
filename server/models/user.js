'use strict';
const {
  Model
} = require('sequelize');

const { validatePassword, validateEmail } = require('../helpers/validation')
const { hashPassword } = require('../helpers/password')

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
      type : DataTypes.STRING,
      validate: {
				validateEmail,
			},
    },
    name: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      validate : {
        validatePassword
      }
    },
    organization: DataTypes.STRING
  }, {
    hooks:{
      async beforeCreate(data){
        data.organization = 'hacktiv8'
        data.password = await hashPassword(data.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};