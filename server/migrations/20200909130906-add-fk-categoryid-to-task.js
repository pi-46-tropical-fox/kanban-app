'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn ("Tasks", "CategoryId", {
      type : Sequelize.INTEGER,
      references : {
        model : "Categories",
        key : "id"
      },
      onUpdate : "CASCADE",
      onDelete : "CASCADE"
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn ("Tasks", "CategoryId")
  }
};
