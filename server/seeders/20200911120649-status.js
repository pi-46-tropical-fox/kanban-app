'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Statuses', [{
      name: 'backlog',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'todo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'doing',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'done',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
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
    await queryInterface.bulkDelete('Statuses', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
