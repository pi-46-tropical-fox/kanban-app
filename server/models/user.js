'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Organization, { through: models.Membership })
      User.hasMany(models.Membership)

      User.hasMany(models.Task)
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true,
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const hashed = hashPass(user)

        user.password = hashed
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};