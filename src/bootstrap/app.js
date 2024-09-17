const Promise = require('bluebird');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const createError = require('http-errors');
const errorHandler = require('./errorHandler');
const swaggerDocument = require('../../swagger.json');
const customErrors = require('../../config/customErrors');

const app = express();

app.isRunning = Promise.pending();
app.dbConnect = require('./mongo');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
}));

app.use(cors());

app.set('showStackError', true);
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_HOST || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.enable('case sensitive routing');
app.enable('strict routing');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/category', require('../routes/categoryRoute'));
app.use('/api/product', require('../routes/productRoute'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

errorHandler(app);
module.exports = app;
