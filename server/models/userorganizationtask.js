'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganizationTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserOrganizationTask.init({
    OrganizationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserOrganizationTask',
  });
  return UserOrganizationTask;
};