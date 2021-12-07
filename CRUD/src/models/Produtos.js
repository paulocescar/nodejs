const { Model, DataTypes } = require('sequelize');

class Produtos extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING(1000),
      category_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10,2),
      base_price: DataTypes.DECIMAL(10,2),
      status: DataTypes.ENUM('A','I'),
      sort_order: DataTypes.INTEGER,
      amount: DataTypes.INTEGER
    }, {
      sequelize
    })    
  }
}

module.exports = Produtos;