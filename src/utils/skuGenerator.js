const { v4: uuidv4 } = require('uuid');

module.exports = function generateSKU() {
  return uuidv4().replace(/-/g, '').slice(0, 8).toUpperCase();
};
