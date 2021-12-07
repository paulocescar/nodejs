'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valor_desconto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_total: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_entrega: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      observacoes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      situacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nota_fiscal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      boleto_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pagseguro_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_frete: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_frete: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('A','I'),
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pedidos');
  }
};
