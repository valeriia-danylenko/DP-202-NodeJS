'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      manufacture_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'manufactures', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      ingridients: { type: Sequelize.STRING(1000) },
      amount: { type: Sequelize.INTEGER, allowNull: false },
      units_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'units', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      price: { type: Sequelize.REAL, allowNull: false },
      img_link: { type: Sequelize.STRING(500), allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
