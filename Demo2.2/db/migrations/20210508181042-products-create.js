'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(127), allowNull: false },
      manufacture_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'manufactures', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      category_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      ingridients: { type: Sequelize.TEXT },
      amount: { type: Sequelize.INTEGER, allowNull: false },
      units_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'units', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      price: { type: Sequelize.REAL, allowNull: false },
      img_link: { type: Sequelize.STRING(511), allowNull: false }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
