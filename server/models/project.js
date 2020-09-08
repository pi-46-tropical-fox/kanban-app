'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Organization)
      Project.belongsTo(models.User)
      Project.belongsTo(models.Task)
      Project.hasMany(models.Category)
    }
  };
  Project.init({
    note: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TaskId : DataTypes.INTEGER,
    OrganizationId : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};