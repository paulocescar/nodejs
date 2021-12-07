const Products = require('../models/Produtos');
const Product_images = require('../models/Produtos_images'); 

module.exports = {
  async index(req, res) {
    const products = await Products.findAll({
      include: [{
          model: Product_images,
          limit: 1
      }]
    })

    return res.json(products);
  },

  async store(req, res) {
    const photos  = req.files;
    
    
    try{
      const { title, description, category_id, price, base_price, amount, sort_order } = req.body;
      const status = 'A';
      const products = await Products.create({ title, description, category_id, price, base_price, amount, status, sort_order });

      var i = 0;
      for(i = 0; i < photos.length; i++) {
        const title = photos[i].filename
        const url = photos[i].filename
        const product_id = products.id
        const sort_order = i
        const status = 'A'
        await Product_images.create({ title, url, product_id, sort_order, status});
      }

      return res.json(products);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async edit(req, res) {
    const photos  = req.files;
    const fs = require('fs');

    function unlink(imgs){
      for(var i =0; i < imgs.length; i++){
        fs.unlink('../../public/imgs/'+ imgs[i].url)
      }
    }

    try{
      const { title, description, category_id, price, base_price, amount, sort_order } = req.body;
      const status = 'A';
      const products = await Products.update({ title, description, category_id, price, base_price, amount, sort_order, status},
        { where: { id: id }});

      const findallimg = await Product_images.findAll({ where: { product_id: id }}).then((response) => {
        const path = require('path');
        for(var i = 0; i < response.length; i++){
          fs.unlinkSync(path.join(__dirname.replace('src\\',''), '../public/imgs/'+response[i].url))
        }
      })
      const deleteimg = await Product_images.destroy({ where: { product_id: id }})

      var i = 0;
      for(i = 0; i < photos.length; i++) {
          const title = photos[i].filename
          const url = photos[i].filename
          const product_id = id
          const sort_order = i
          const status = 'A'
          const product_images = Product_images.create({ title, url, product_id, sort_order, status});
      }

      return res.json(deleteimg);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async getone(req, res) {
    const id = req.query.id

    const product = await Products.findByPk(id,{
      include: [{
        model: Product_images
    }]
  });
    return res.json(product);
  },

  async delete(req, res) {
    const id = req.query.id

    const deletar = await Products.destroy({ where: { id: id }})

    return res.json(deletar);
  }
};