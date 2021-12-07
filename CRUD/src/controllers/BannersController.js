const Banners = require('../models/Produtos');
const Banners_images = require('../models/Produtos_images'); 

module.exports = {
  async index(req, res) {
    const banners = await Banners.findAll({
      include: [{
          model: Product_images,
          limit: 1
      }]
    })

    return res.json(banners);
  },

  async store(req, res) {
    const photos  = req.files;
    
    
    try{
      const { title, status } = req.body;
      const status = 'A';
      const banners = await Banners.create({ title, status });

      var i = 0;
      for(i = 0; i < photos.length; i++) {
        const banner_id = banners.id
        const page_url = photos[i].filename
        const url = photos[i].filename
        const mobile = 'I'
        const sort_order = i
        const status = 'A'
        await Banners_images.create({ banner_id, page_url, url, mobile, sort_order, status});
      }

      return res.json(banners);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async edit(req, res) {
    const photos  = req.files;
    const fs = require('fs');

    function unlink(imgs){
      for(var i =0; i < imgs.length; i++){
        fs.unlink('../../public/imgs_banners/'+ imgs[i].url)
      }
    }

    try{
      const { title, status } = req.body;
      const status = 'A';
      const banners = await Banners.update({ title, status},
        { where: { id: id }});

      const findallimg = await Banners_images.findAll({ where: { banner_id: id }}).then((response) => {
        const path = require('path');
        for(var i = 0; i < response.length; i++){
          fs.unlinkSync(path.join(__dirname.replace('src\\',''), '../public/imgs_banners/'+response[i].url))
        }
      })
      const deleteimg = await Banners_images.destroy({ where: { banner_id: id }})

      var i = 0;
      for(i = 0; i < photos.length; i++) {
          const banner_id = banners.id
          const page_url = photos[i].filename
          const url = photos[i].filename
          const mobile = 'I'
          const sort_order = i
          const status = 'A'
          const banners_images = Banners_images.create({  banner_id, page_url, url, mobile, sort_order, status});
      }

      return res.json(banners);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async getone(req, res) {
    const id = req.query.id

    const banners = await Banners.findByPk(id,{
      include: [{
        model: Product_images
    }]
  });
    return res.json(banners);
  },

  async delete(req, res) {
    const id = req.query.id

    const deletar = await Banners.destroy({ where: { id: id }})
    const findallimg = await Banners_images.findAll({ where: { banner_id: id }}).then((response) => {
      const path = require('path');
      for(var i = 0; i < response.length; i++){
        fs.unlinkSync(path.join(__dirname.replace('src\\',''), '../public/imgs_banners/'+response[i].url))
      }
    })
    const deleteimg = await Banners_images.destroy({ where: { banner_id: id }})

    return res.json(deletar);
  }
};