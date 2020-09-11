'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      TaskCategoryId: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references: {
          model : 'TaskCategories',
          key : 'id'
        }
      },
      UserId : {
        allowNull : false,
        type: Sequelize.INTEGER,
        references: {
          model : 'Users',
          key : 'id'
        }
      },
      category : {
        type : Sequelize.INTEGER,
        references: {
          model : 'TaskCategories',
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};