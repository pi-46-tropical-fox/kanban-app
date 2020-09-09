'use strict';
const {
  Model
} = require('sequelize');
const isPast = require('date-fns/isPast');
const isToday = require('date-fns/isToday');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User);
      Task.belongsTo(models.Organization);
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Title cannot null',
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Description cannot null',
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Category cannot null',
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Due date cannot empty',
        },
        notNull: {
          args: true,
          msg: 'Due date cannot null',
        },
        notPast(value) {
          if (isPast(new Date(value)) && !isToday(new Date(value))) {
            throw new Error('Due date cannot yesterday or past');
          }
        }
      }
    },
    OrganizationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};