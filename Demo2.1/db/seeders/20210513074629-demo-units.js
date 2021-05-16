module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('units', [
      { unit: '0.25 kg' },
      { unit: '1 kg' },
      { unit: '1 pack' },
      { unit: '0.5 kg' },
      { unit: '0.3 kg' },
      { unit: '1.6 L' },
      { unit: '0.226 kg' },
      { unit: '0.48 kg' },
      { unit: '0.22 kg' },
      { unit: '1 L' },
      { unit: '0.5 L' },
      { unit: '1.75 L' },
      { unit: '2 L' },
      { unit: '0.33 L' },
      { unit: '0.15 kg' }

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('units', null, {});
  }
};