'use strict';
const {
  Model
} = require('sequelize');
const {hashingPassword} = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Organization,{through:models.UserOrganization})
      User.hasMany(models.UserOrganization)
      User.belongsToMany(models.Task,{through:models.Project})
      User.hasMany(models.Project)
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {hashingPassword(user)}
    }
  });
  return User;
};