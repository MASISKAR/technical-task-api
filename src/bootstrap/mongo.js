const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique, {
  defaultMessage: '{PATH} ({VALUE}) duplication detected',
});
module.exports = (mongoConfig) => mongoose.connect(mongoConfig.connection.url);
