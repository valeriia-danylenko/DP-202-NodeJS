'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('units', { 
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      unit: {type: Sequelize.STRING(15), allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('units');
  }
};