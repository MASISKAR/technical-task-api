const fs = require('fs');
const Ajv = require('ajv');
const basename = require('path').basename(__filename);

const validator = Ajv({ allErrors: true, removeAdditional: 'all', $data: true });

fs.readdirSync('./config/validation').filter((file) => (
  file.indexOf('.') !== 0) && (
  file !== basename) && (
  file.slice(-7) === '.v.json')).forEach((file) => {
  const schemaName = file.slice(0, -7);
  // eslint-disable-next-line import/no-dynamic-require
  validator.addSchema(require(`../../config/validation/${file}`), schemaName);
});

const errorResponse = ([error]) => ({
  error: {
    name: 'ValidationError',
    message: `${error.dataPath} ${error.message}`,
    status: 422,
  },
});

module.exports = (schemaName) => async (req, res, next) => {
  const validationData = {
    body: req.body,
    query: req.query,
    params: req.params,
  };
  const valid = validator.validate(schemaName, validationData);
  if (!valid) return res.status(400).json(errorResponse(validator.errors)).end();
  return next();
};
