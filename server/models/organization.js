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
      Organization.belongsToMany(models.User, { through: models.Role })
      Organization.hasMany(models.Project)
      Organization.hasMany(models.Role)
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You should have a valid organization name!"
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    hooks: {
      afterCreate() {
        //
      }
    },
    modelName: 'Organization',
  });
  return Organization;
};