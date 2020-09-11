'use strict';
const {
  Model
} = require('sequelize');
const {createHash} = require('../helpers/validateUser')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username cannot empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate :{
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 15],
          msg: 'Pasword min 6 characters max 15 characters'
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, options) => {
    let hash = createHash(user.password)
    user.password = hash
    user.organization = "Hacktiv8"
  });
  return User;
};