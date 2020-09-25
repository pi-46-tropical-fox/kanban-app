'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Bukan Anak Hacktiv8',
      email: 'aseng@mail.com',
      password: '$2b$10$I0/XuvORLsiLvEcdXo/yN.tKAFK/eywfB.UV3sOE0chtcd5Cz1Wia',
      organization: 'asing',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
