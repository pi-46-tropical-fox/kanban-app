'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsTo(models.Organization)
      Role.belongsTo(models.User)
    }
  };
  Role.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Owner', 'Collaborator', 'Viewer']],
          msg: "Unknown data value"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};