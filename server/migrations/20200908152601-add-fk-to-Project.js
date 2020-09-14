'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Projects", "OrganizationId", {
      type : Sequelize.INTEGER,
      references : {
        model : "Organizations",
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    })
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Projects', 'OrganizationId')
  }
};


//ubah ke one to many
//user to task