'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
    { category:  'Sauces' },
    { category:  'Fruits & Vegetables' },
    { category:  'Tea & Coffee' },
    { category:  'Meat & Seafood' },
    { category:  'Beverages' },
    { category:  'Dairy, Eggs & Cheese' },
    { category:  'Sweets' },
    { category:  'Grains, Pasta & Sides' },
    { category:  'Bread & Bakery' },
    { category:  'Snacks' }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};