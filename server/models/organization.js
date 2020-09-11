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
      Organization.hasMany(models.Project)
      Organization.belongsToMany(models.User,{through:models.UserOrganization})
      Organization.hasMany(models.UserOrganization)
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required!`,
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Organization',
    hooks: {
      beforeCreate(organization) {
        organization.name = 'Hacktiv8'
      }
    }
  });
  return Organization;
};