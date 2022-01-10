const { Model, DataTypes } = require('sequelize');

class Produtos extends Model {
  static init(sequelize) {
    super.init({
      funcao: DataTypes.STRING,
      habilitar: DataTypes.ENUM('A','I'),
      sandbox: DataTypes.ENUM('A','I'),
      parcelas_sem_juros: DataTypes.INTEGER,
      vendedor_email: DataTypes.STRING,
      vendedor_token: DataTypes.STRING,
      vendedor_nome: DataTypes.STRING,
      vendedor_cpf: DataTypes.STRING,
      vendedor_ddd: DataTypes.STRING,
      vendedor_fone: DataTypes.STRING
    }, {
      sequelize
    })    
  }
}

module.exports = Produtos;