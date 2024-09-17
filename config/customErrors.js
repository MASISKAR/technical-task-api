module.exports = {
  defaultError: {
    name: 'somethingWentWrong',
    message: 'Something went wrong please try again later',
    private: true,
    status: 500,
  },
  categoryNotFound: {
    name: 'categoryNotFound',
    message: 'Category not found',
    private: false,
    status: 404,
  },
  productNotFound: {
    name: 'productNotFound',
    message: 'Product not found',
    private: false,
    status: 404,
  },
  duplicationDetected: {
    name: 'duplicationDetected',
    private: false,
    status: 409,
  },
  validationError: {
    name: 'validationError',
    private: false,
    status: 422,
  },
};
