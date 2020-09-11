'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
let data = [
  {
    email: 'abdul@mail.com',
    password: bcrypt.hashSync('123456', salt),
    organization: 'Hacktiv8',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'abdul2@mail.com',
    password: bcrypt.hashSync('123456', salt),
    organization: 'Hacktiv8',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'abdul3@mail.com',
    password: bcrypt.hashSync('123456', salt),
    organization: 'Hacktiv8',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data)
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
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
