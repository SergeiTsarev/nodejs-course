'use strict';
/* eslint-disable */

const uuidv4 = require('uuid').v4;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          login: 'JohnDoe',
          password: 'qwerty123',
          age: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          login: 'Ivan Petrov',
          password: 'qwerty1234',
          age: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          login: 'Dimitris P',
          password: 'qwerty123!',
          age: 65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
