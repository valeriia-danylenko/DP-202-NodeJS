'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_items', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      order_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'orders', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      amount: { type: Sequelize.INTEGER, allowNull: false }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_items');
  }
};
