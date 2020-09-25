'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserOrganization.init({
    role: DataTypes.STRING,
    OrganizationsId: DataTypes.INTEGER,
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserOrganization',
  });
  return UserOrganization;
};