'use strict';
const {
  Model
} = require('sequelize');
const { hashed } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Organization, {foreignKey: 'orgId'})
      User.hasMany(models.Task, {foreignKey: 'userId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args:true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [8,12],
          msg: 'Password must be between 8-12 characters'
        }
      }
    },
    orgId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashed(user.password)
        if (!user.orgId) {
          user.orgId = 1
        }
      }
    },
    modelName: 'User',
  });
  return User;
};