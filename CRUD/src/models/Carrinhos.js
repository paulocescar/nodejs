const { Model, DataTypes } = require('sequelize');

class Carrinhos extends Model {
  static init(sequelize) {
    super.init({
      user_id: DataTypes.INTEGER,
      tipo_frete: DataTypes.STRING,
      valor_frete: DataTypes.STRING,
      status: DataTypes.INTEGER
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Carrinhos_produtos, { foreignKey: 'carrinho_id' });
  }
}

module.exports = Carrinhos;