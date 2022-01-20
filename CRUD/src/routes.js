const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/multer")

const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const ProductsController = require('./controllers/ProductsController');
const PagseguroController = require('./controllers/PagseguroController');


const {verifyJWT} = require('./middleware');

const routes = express.Router();


routes.get('/users', verifyJWT, UserController.index);
routes.post('/users', UserController.store);

routes.post('/logout', UserController.logout);
routes.post('/login', UserController.login);

routes.get('/products', verifyJWT, ProductsController.index);
routes.get('/get_product', verifyJWT, ProductsController.getone);
routes.post('/add_product', verifyJWT, multer(multerConfig).array('photos', 12), ProductsController.store);
routes.post('/edit_product', verifyJWT, multer(multerConfig).array('photos', 12), ProductsController.edit);


routes.get('/sessao', PagseguroController.sessao);
routes.post('/bandeira', PagseguroController.bandeira);
routes.post('/parcelamento', PagseguroController.parcelamento);
routes.post('/token_cartao', PagseguroController.token_cartao);
routes.post('/credito_pagseguro', PagseguroController.credito_pagseguro);
routes.post('/boleto_pagseguro', PagseguroController.boleto_pagseguro);

module.exports = routes;