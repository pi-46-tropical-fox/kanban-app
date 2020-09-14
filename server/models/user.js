'use strict';
const {
  Model
} = require('sequelize');
const passHash = require('../helpers/passHash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Organization, {through: models.Task})
      this.belongsToMany(models.Organization, {through: models.Role})

      this.hasMany(models.Task)
      this.hasMany(models.Role)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: "You're entering an invalid email"
        },
      }
    },
    name: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      validate:{
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+=]).{8,}$/,
          msg:
            'the password must contain at least 8 characters including at least a uppercase, a lowercase and a number.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: function(userData){
        // console.log(userData.password);

        userData.password = passHash(userData.password)
        // console.log(userData.password);
      }
    }
  });
  return User;
};