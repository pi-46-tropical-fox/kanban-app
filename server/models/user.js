'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasMany (models.Task)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "Invalid email format"
        },
        notEmpty : {
          args : true,
          msg : "You must insert your email address"
        },
        // unique : {
        //   args : true,
        //   msg : "Email address has been used"
        // }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "You must insert your email address"
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate (user, options) {
        let salt = bcrypt.genSaltSync (10)
        let hash = bcrypt.hashSync (user.password, salt)
        user.password = hash
        user.organization = "Hacktiv8"
      },
      // beforeValidate (user, options) {
      //   let salt = bcrypt.genSaltSync (10)
      //   let hash = bcrypt.hashSync (user.password, salt)
      //   user.password = hash
      // }
    }
  });
  return User;
};