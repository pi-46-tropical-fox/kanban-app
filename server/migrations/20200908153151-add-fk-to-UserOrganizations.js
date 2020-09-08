'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("UserOrganizations", "UserId", {
      type : Sequelize.INTEGER,
      references : {
        model : "Users",
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    }).then(()=>{
      queryInterface.addColumn("UserOrganizations", "OrganizationsId", {
        type : Sequelize.INTEGER,
        references : {
          model : "Organizations",
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      })
    })
    .catch(err=>{
      console.log(err);
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('UserOrganizations', 'UserId')
    .then(()=>{
      return queryInterface.removeColumn('UserOrganizations', 'OrganizationsId')
    })
  }
};
