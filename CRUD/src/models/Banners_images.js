const { Model, DataTypes, INTEGER } = require('sequelize');

class Banners_images extends Model {
  static init(sequelize) {
    super.init({
      banner_id: DataTypes.INTEGER,
      page_url: DataTypes.STRING,
      url: DataTypes.STRING,
      mobile: DataTypes.STRING,
      sort_order: DataTypes.INTEGER,
      status: DataTypes.ENUM('A','I')
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Banners, { foreignKey: 'banner_id' });
  }
}

module.exports = Banners_images;