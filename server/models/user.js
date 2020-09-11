'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:`email need to be fill`
        },
        isEmail:{
          args:true,
          msg:`please fill with email format`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[4,12],
          msg:`password minimun 4 characters and maximum 12 characters`
        }
      }
    },
    organization: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    user.organization = "hacktiv8"

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  })
  return User;
};