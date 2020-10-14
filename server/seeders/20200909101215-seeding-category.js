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
    await queryInterface.bulkInsert('Categories', [
      {
        category: 'Back-Log',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        category: 'Todo',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        category: 'Doing',
        createdAt: new Date,
        updatedAt: new Date()
      },
      {
        category: 'Done',
        createdAt: new Date,
        updatedAt: new Date()
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
