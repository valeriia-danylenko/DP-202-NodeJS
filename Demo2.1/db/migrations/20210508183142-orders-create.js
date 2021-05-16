'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
