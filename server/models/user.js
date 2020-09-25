'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Name can\'t be null'
        },
        notEmpty: {
          msg: 'Name can\'t be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail : {
          msg: 'Email not valid'
        },
        notEmpty: {
          msg: 'Email can\'t be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: 'Password can\'t be null'
        },
        notEmpty: {
          msg: 'Password can\'t be empty'
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
    }
  },
  {
    hooks: {
      beforeSave(user, options) {
        return hash(user.password)
        .then(encrypted => {
          user.password = encrypted
          user.organization = 'hacktiv8'
        })
      }
    },
    sequelize
  })
  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  return User;
};