'use strict';
const {
  Model
} = require('sequelize');
const {createHash} = require('../helpers/bcrypt')
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
    password: DataTypes.STRING,
    organization: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate : ((user,option) =>{
        user.password = createHash(user.password)
        user.organization = 'Hacktiv8'
      }),
      
    },
    modelName: 'User',
  });
  return User;
};