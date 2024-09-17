const mongoose = require('mongoose');
const customErrors = require('../../config/customErrors');
const categorySchema = require('../schemas/categorySchema');
const productSchema = require('../schemas/productSchema');

class CategoryController {
  create = async (req, res, next) => {
    try {
      const category = await categorySchema.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  };

  details = async (req, res, next) => {
    try {
      const category = await categorySchema
        .findById(req.params.id)
        .lean();

      if (!category) throw customErrors.categoryNotFound;
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  };

  list = async (req, res, next) => {
    try {
      const categories = await categorySchema
        .find()
        .lean();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const category = await categorySchema
        .findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
        )
        .lean();
      if (!category) throw customErrors.categoryNotFound;

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const categoryId = req.params.id;
      await productSchema.updateMany(
        { category: categoryId },
        { $set: { category: null } },
        { session },
      );

      const category = await categorySchema.findByIdAndDelete(req.params.id);
      if (!category) throw customErrors.categoryNotFound;

      await session.commitTransaction();
      await session.endSession();

      res.send(204);
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      next(err);
    }
  };
}

module.exports = new CategoryController();
