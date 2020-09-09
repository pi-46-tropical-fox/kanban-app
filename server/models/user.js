'use strict';
const {
  Model
} = require('sequelize');
const { generatePassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Organization);
      User.hasMany(models.Task);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already registered',
      },
      validate: {
        is: {
          args: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
          msg: 'Username can only contain alphanumeric character and special . _',
        },
        notEmpty: {
          args: true,
          msg: 'Username cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Username cannot null',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already registered',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is invalid',
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Email cannot null',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Password cannot null',
        },
        minLength(value) {
          if (value.length < 6) {
            throw new Error('Password must be minimal 6 characters');
          }
        }
      }
    },
    OrganizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = generatePassword(instance.password);
    instance.OrganizationId = 1; // DEFAULT: referring to 'Hacktiv8', run DefaultOrganization seeder
  });
  return User;
};