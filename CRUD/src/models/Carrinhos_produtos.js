const { Model, DataTypes } = require('sequelize');

class Carrinhos_produtos extends Model {
  static init(sequelize) {
    super.init({
      carrinho_id: DataTypes.INTEGER,
      produto_id: DataTypes.INTEGER,
      preco: DataTypes.DECIMAL(10,2),
      tamanho: DataTypes.STRING,
      cor: DataTypes.STRING,
      quantidade: DataTypes.INTEGER,
      status: DataTypes.ENUM('A','I')
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Carrinhos, { foreignKey: 'carrinho_id' });
  }
}

module.exports = Carrinhos_produtos;