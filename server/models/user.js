'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt');
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
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email sudah ada"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Format email salah"
        },
        notEmpty: {
          args: true,
          msg: "Email tidak boleh kosong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password tidak boleh kosong"
        },
        min: {
          args: 5,
          msg: "Password kurang karakter"
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((inst, opt) => {
    inst.password = hashPassword(inst.password)
    inst.organization = 'Hacktiv8'
  })
  return User;
};