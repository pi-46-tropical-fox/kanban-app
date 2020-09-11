'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Organization, { through: models.Role })
      User.hasMany(models.Role)
      User.hasMany(models.Assignee)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You shouldn't have an empty name."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You can't have an empty username."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "You should fill out the email, darlin'"
        },
        isEmail: {
          msg: "Should be a valid email, or otherwise, we can't contact you."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Would you like your account to be h*cked?"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        instance.password = createHash(instance.password)
      },

      async afterCreate(instance, options) {
        try {
          // creating default organization repository
          let org = await sequelize.models.Organization.create({
            name: "Hacktiv8",
            type: "personal"
          })

          let role = await sequelize.models.Role.create({
            UserId: instance.id,
            OrganizationId: org.id,
            name: "Owner"
          })

          let project = await sequelize.models.Project.create({
            name: "Personal Project",
            type: "private",
            OrganizationId: org.id
          })

          let boards = ['Backlog', 'Todo', 'Doing', 'Done']

          boards.forEach(async (board) => {
            await sequelize.models.Board.create({
              name: board,
              ProjectId: project.id
            })
          })
        } catch (err) {
          console.log(err);
        }
      }
    },
    modelName: 'User',
  });
  return User;
};