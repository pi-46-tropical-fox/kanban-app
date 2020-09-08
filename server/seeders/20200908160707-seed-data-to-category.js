'use strict';
let seed = 

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
    return queryInterface.bulkInsert('Categories', [
      {
        status: 'Back-log',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        status: 'To do',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'In progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Done',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
