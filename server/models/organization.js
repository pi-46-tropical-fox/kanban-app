'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many To Many With User
      Organization.belongsToMany(models.User, { through: models.Membership })
      Organization.hasMany(models.Membership)

      // One To Many With Board
      Organization.hasMany(models.Board)
    }
  };
  Organization.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};