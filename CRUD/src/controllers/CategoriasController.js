const Produtos_categorias = require('../models/Produtos_categorias');

module.exports = {
  async index(req, res) {
    const produtos_categorias = await Produtos_categorias.findAll()

    return res.json(produtos_categorias);
  },

  async store(req, res) {
    
    try{
      const { title, sort_order } = req.body;
      const status = 'A';
      const produtos_categorias = await Products.create({ title, sort_order, status });

      return res.json(produtos_categorias);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async edit(req, res) {
    try{
      const { title, sort_order } = req.body;
      const status = 'A';
      const produtos_categorias = await Produtos_categorias.update({ title, sort_order, status},
        { where: { id: id }});

      return res.json(produtos_categorias);
    } catch (err) {
      
      return res.json(err);
    }
  },

  async getone(req, res) {
    const id = req.query.id

    const produtos_categorias = await Produtos_categorias.findByPk(id);
    return res.json(produtos_categorias);
  },

  async delete(req, res) {
    const id = req.query.id

    const deletar = await Produtos_categorias.destroy({ where: { id: id }})

    return res.json(deletar);
  }
};