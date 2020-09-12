'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Tasks', 'CategoryId', {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      queryInterface.addColumn('Tasks', 'UserId', {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]) 
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down:  (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Tasks', 'CategoryId'),
      queryInterface.removeColumn('Tasks', 'UserId')
    ] )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
