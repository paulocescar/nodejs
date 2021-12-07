const { Model, DataTypes } = require('sequelize');

class Produtos_categorias extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      status: DataTypes.ENUM('A','I')
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Produtos_images, { foreignKey: 'product_id' });
  }
}

module.exports = Produtos_categorias;