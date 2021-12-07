const { Model, DataTypes } = require('sequelize');

class Banners extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      status: DataTypes.INTEGER
    }, {
      sequelize
    })    
  }

  static associate(models) {
    this.hasMany(models.Banners_images, { foreignKey: 'banner_id' });
  }
}

module.exports = Banners;