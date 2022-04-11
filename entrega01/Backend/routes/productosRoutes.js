const Controller = require('../Controllers/controllerProducts')
const express = require('express');
const routeProducts  = express.Router();

const auth = require('../middleware/auth');

routeProducts.get('/', auth(true), Controller.getAllProducts);
routeProducts.get('/:id', auth(true), Controller.getProductById);
routeProducts.post('/', auth(true), Controller.newProduct);
routeProducts.put('/:id', auth(true), Controller.updateProductById);
routeProducts.delete('/:id', auth(true), Controller.deleteProduct);



module.exports = routeProducts;

