'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transacoes', [
      {
        descricao: 'Salário',
        valor: 3500,
        data: '2025-05-01',
        tipo: 'receita',
        pago: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descricao: 'Supermercado',
        valor: 450.75,
        data: '2025-05-05',
        tipo: 'despesa',
        pago: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transacoes', null, {});
  }
};
