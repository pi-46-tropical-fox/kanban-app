'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaskTag.belongsTo(models.Tag)
      TaskTag.belongsTo(models.Task)
    }
  };
  TaskTag.init({
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TaskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TaskTag',
  });
  return TaskTag;
};