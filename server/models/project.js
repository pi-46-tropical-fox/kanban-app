'use strict';
const {
  Model
} = require('sequelize');
const { generateRandomStrings } = require('../helpers/randomizer');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.Board)
      Project.belongsTo(models.Organization)
    }
  };
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You can't have an empty name on your project!"
        }
      }
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
          args: [['public', 'private']],
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
      async beforeValidate(instance, options){
        let uid = generateRandomStrings(5, true)
        let slug = instance.name.toLowerCase().split(' ').join('-')
        let project = null
        

        while(true){
          project = await this.findOne({where: { uid }})

          if(project){
            uid = generateRandomStrings(5, true)
          } else {
            break
          }
        }

        instance.slug = slug
        instance.uid = uid
      },
    },
    modelName: 'Project',
  });
  return Project;
};