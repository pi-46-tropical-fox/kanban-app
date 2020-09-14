'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task)
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isLength(value){
          if(value.length < 3){
            throw new Error ("Category name must contain more than 3 characters")
          }
        }
      } 
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};