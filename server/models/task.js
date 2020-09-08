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
      Task.belongsTo(models.Category)
      Task.belongsToMany(models.User,{through:models.Project})
      Task.hasMany(models.Project)
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date_post: DataTypes.DATE,
    due_date: DataTypes.DATE,
    CategoriesId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};