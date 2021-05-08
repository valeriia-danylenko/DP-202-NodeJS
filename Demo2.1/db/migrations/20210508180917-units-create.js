'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('units', { 
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      units: {type: Sequelize.STRING(10), allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('units');
  }
};