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
    title: "Backlog",
    ProjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },{
    title: "Todo",
    ProjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },{
    title: "Doing",
    ProjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },{
    title: "Done",
    ProjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
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
