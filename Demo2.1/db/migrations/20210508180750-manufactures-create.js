'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.createTable('manufactures', { 
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      manufacture: {type: Sequelize.STRING(100), allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('manufactures');
  }
};
