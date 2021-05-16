'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('categories', { 
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      category: {type: Sequelize.STRING(50), allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};
