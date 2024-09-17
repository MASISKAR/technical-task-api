const express = require('express');
const validator = require('../middleware/validatorMiddleware');

const productRouter = express.Router();
const productController = require('../controllers/productController');

/**
 * Аll routes start with '/product'
 * */

productRouter.post('/', validator('product-create'), productController.create);

productRouter.get('/:id', productController.details);

productRouter.get('/', productController.list);

productRouter.put('/:id', validator('product-update'), productController.update);

productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
