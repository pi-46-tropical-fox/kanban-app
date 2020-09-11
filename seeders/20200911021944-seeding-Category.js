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
   await queryInterface.bulkInsert('Categories', [{
     name: 'Backlog',
     createdAt: new Date(),
     updatedAt: new Date()
   }])
   await queryInterface.bulkInsert('Categories', [{
    name: 'Todo',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  await queryInterface.bulkInsert('Categories', [{
    name: 'Doing',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  await queryInterface.bulkInsert('Categories', [{
    name: 'Done',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
