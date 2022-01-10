'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pagseguro', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      funcao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      habilitar: {
        type: Sequelize.ENUM('A','I'),
        allowNull: false,
      },
      sandbox: {
        type: Sequelize.ENUM('A','I'),
        allowNull: false,
      },
      parcelas_sem_juros: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      vendedor_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendedor_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendedor_nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendedor_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendedor_ddd: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendedor_fone: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('pagseguro');
  }
};
