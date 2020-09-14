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
      this.belongsTo(models.User)
      this.belongsTo(models.Organization)
      this.belongsTo(models.Category)
    }
  };
  Task.init({
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        isLength(value){
          if(value.length < 3){
            throw new Error ("Title must contain more than 3 characters")
          }
        }
      } 
    },
    CategoryId: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    OrganizationId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};