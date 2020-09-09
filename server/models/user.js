'use strict';
const {
  Model
} = require('sequelize');

const { validatePassword } = require('../helpers/password')

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
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      validate : {
        validatePassword
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};