'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uid: { // just a random, 10-character strings
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Public', 'Private']],
          msg: "Unknown data value"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    hooks: {
      beforeValidate(instance, options){
        let uid = generateRandomStrings(5, true, false)
        
        while(this.findOne({ where: { uid } })){
          uid = generateRandomStrings(5, true, false)
        }

        instance.uid = uid
      },
    },
    modelName: 'Project',
  });
  return Project;
};