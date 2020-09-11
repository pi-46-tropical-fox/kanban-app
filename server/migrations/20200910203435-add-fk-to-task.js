'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Tasks', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
    await queryInterface.addColumn('Tasks', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
    await queryInterface.addColumn('Tasks', 'OrganizationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Organizations',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Tasks', 'CategoryId')
    await queryInterface.removeColumn('Tasks', 'UserId')
    await queryInterface.removeColumn('Tasks', 'OrganizationId')
  }
};
