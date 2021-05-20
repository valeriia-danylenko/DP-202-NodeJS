const express = require('express');
const ordersController = require('./ordersController');
const ordersRouter = express.Router();
const validator = require('express-joi-validation').createValidator({})
const checkProducts = require('../common/middleware/checkProductsMiddleware');
const productsDto = require('../common/dtos/productsDto');

ordersRouter.post("/", validator.body(productsDto), checkProducts, ordersController.handleOrder);

module.exports = ordersRouter;