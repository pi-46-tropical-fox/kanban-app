'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignee.belongsTo(models.User)
      Assignee.belongsTo(models.Task)
    }
  };
  Assignee.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TaskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Assignee',
  });
  return Assignee;
};