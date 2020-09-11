'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    queryInterface.bulkInsert('TaskCategories', [
      {
        name : 'Backlog',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Todo',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Doing',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Done',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
