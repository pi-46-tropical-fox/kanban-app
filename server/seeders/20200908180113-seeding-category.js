'use strict';
let data = [
  {
    name: 'Backlog',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'To Do',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Doing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Done',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
