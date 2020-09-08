'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("Projects", "UserId", {
      type : Sequelize.INTEGER,
      references : {
        model : "Users",
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    }).then(()=>{
      queryInterface.addColumn("Projects", "TaskId", {
        type : Sequelize.INTEGER,
        references : {
          model : "Tasks",
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      })
    }).then(()=>{
      queryInterface.addColumn("Projects", "OrganizationId", {
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
    return queryInterface.removeColumn('Projects', 'UserId')
    .then(()=>{
      return queryInterface.removeColumn('Projects', 'TaskId')
      .then(()=>{
        return queryInterface.removeColumn('Projects', 'OrganizationId')
      })
    })
  }
};
