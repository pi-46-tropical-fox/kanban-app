'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
      Todo.belongsTo(models.Category)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args: true,
          msg: "Title cannot empty"
        }
      }
    },  
    description: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter : {
          args: `${new Date()}`,
          msg: "Date cannot back date"

        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};