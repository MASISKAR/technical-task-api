const express = require('express');
const validator = require('../middleware/validatorMiddleware');

const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * Аll routes start with '/category'
 * */

categoryRouter.post('/', validator('category-create'), categoryController.create);

categoryRouter.get('/:id', categoryController.details);

categoryRouter.get('/', categoryController.list);

categoryRouter.put('/:id', validator('category-update'), categoryController.update);

categoryRouter.delete('/:id', categoryController.delete);

module.exports = categoryRouter;
