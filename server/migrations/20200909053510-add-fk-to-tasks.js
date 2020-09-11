'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      const addUserId = await queryInterface.addColumn("Tasks", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      });
      const addCategoryId = await queryInterface.addColumn("Tasks", "CategoryId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      });
    } catch(err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      const removeUserId = await queryInterface.removeColumn("Tasks", "UserId");
      const removeCategoryId = await queryInterface.removeColumn("Tasks", "CategoryId");
    } catch(err) {
      console.log(err);
    }
  }
};
