'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.User);
      Organization.hasMany(models.Task);
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Organization name already registered',
      },
      validate: {
        is: {
          args: /^[a-z0-9_-]{3,16}$/igm,
          msg: 'Organization name can only contain alphanumeric character and special - _',
        },
        notEmpty: {
          args: true,
          msg: 'Organization name cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Organization name cannot null',
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};