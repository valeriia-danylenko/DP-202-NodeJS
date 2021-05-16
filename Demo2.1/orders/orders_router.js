const express = require('express');
const ordersController = require('./orders_controller');
const ordersRouter = express.Router();
const validator = require('express-joi-validation').createValidator({})
const checkProducts = require('../common/middleware/check_products_middleware');
const productsDto = require('../common/dtos/products_dto');

ordersRouter.post("/", validator.body(productsDto), checkProducts, ordersController.handleOrder);

module.exports = ordersRouter;