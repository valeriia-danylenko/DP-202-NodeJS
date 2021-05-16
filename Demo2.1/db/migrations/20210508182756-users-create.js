'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      phone: { type: Sequelize.STRING(12), allowNull: false },
      user_name: { type: Sequelize.STRING(30), allowNull: false },
      email: { type: Sequelize.STRING(100) },
      email: { type: Sequelize.STRING(30), allowNull: false }
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
