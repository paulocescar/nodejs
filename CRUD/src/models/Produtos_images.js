const { Model, DataTypes } = require('sequelize');

class Produtos_images extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      sort_order: DataTypes.INTEGER,
      status: DataTypes.ENUM('A','I')
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Produtos, { foreignKey: 'product_id' });
  }
}

module.exports = Produtos_images;