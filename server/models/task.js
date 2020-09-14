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
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Title is required!`,
        },
      },
    },
    description: DataTypes.STRING,
    date_post: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `Date post is required!`,
        },
      },
    },
    due_date: DataTypes.DATE,
    UserId : DataTypes.INTEGER,
    CategoryId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};


//ubah ke one to many
//user to task