'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return(queryInterface.bulkInsert('posts', [
      {
        title: 'first',
        body:  'lorem ipsum',
        slug:  'first'
      }, {
        title: 'second',
        body:  'lorem ipsum',
        slug:  'second'
      }, {
        title: 'third',
        body:  'lorem ipsum',
        slug:  'third'
      }
    ]));
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('posts');
  }
};
