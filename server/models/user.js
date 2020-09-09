'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Role)
      User.hasMany(models.Assignee)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};