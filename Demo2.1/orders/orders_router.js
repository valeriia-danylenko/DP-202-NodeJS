const express = require('express');
const ordersController = require('./orders_controller');
const ordersRouter = express.Router();
const validator = require('express-joi-validation').createValidator({})
const { checkProducts} = require('../common/middleware/middlewares')
const {productsArrDto} = require('../common/other/dto.js')

ordersRouter.post("/", validator.body(productsArrDto), checkProducts, ordersController.handleOrder);

module.exports = ordersRouter;  