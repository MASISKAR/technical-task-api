const customErrors = require('../../config/customErrors');
const productSchema = require('../schemas/productSchema');
const generateSKU = require('../utils/skuGenerator');

class ProductController {
  create = async (req, res, next) => {
    try {
      const product = await productSchema.create({
        sku: generateSKU(),
        ...req.body,
        category: req.body.category || null,
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  };

  details = async (req, res, next) => {
    try {
      const product = await productSchema
        .findById(req.params.id)
        .populate('category')
        .lean();

      if (!product) throw customErrors.productNotFound;
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  list = async (req, res, next) => {
    try {
      const products = await productSchema
        .find()
        .populate('category')
        .lean();

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const product = await productSchema
        .findByIdAndUpdate(
          req.params.id,
          { ...req.body, category: req.body.category || null },
          { new: true },
        )
        .populate('category')
        .lean();

      if (!product) throw customErrors.productNotFound;

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const product = await productSchema.findByIdAndDelete(req.params.id);
      if (!product) throw customErrors.productNotFound;

      res.send(204);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new ProductController();
