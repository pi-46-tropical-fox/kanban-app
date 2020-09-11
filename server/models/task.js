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
      Task.belongsTo(models.Board)
      Task.hasMany(models.Comment)
      Task.hasMany(models.TaskTag)
      Task.hasMany(models.Assignee)
    }
  };
  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You can't have an empty name on your task!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    BoardId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TaskId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};