'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Organization, {foreignKey: 'orgId'})
      Task.belongsTo(models.User, {foreignKey: 'userId'})
      Task.belongsTo(models.Status, {foreignKey: 'status'})
    }
  };
  Task.init({
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
    orgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (task, options) => {
        task.status = 1
      }
    },
    modelName: 'Task',
  });
  return Task;
};