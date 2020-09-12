'use strict';

let data = [
    {
        title: 'Layout kanban',
        description: 'Bikin layout kanban dengan css flex dan grid',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Vue di client',
        description: 'Setup vue di client',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Server',
        description: 'Setup server',
        CategoryId: 2,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Axio',
        description: 'Setup axio di server',
        CategoryId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Alert',
        description: 'Setup alert di client',
        CategoryId: 4,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Rocket',
        description: 'Socket io, dragable untuk tambahan nilai',
        CategoryId: 1,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', data)
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
    await queryInterface.bulkDelete('Tasks', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
