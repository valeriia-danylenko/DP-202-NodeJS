const express = require('express');
const ordersController = require('../controllers/orders_controller');
const ordersRouter = express.Router();

ordersRouter.post("/", ordersController.handleOrder);

module.exports = ordersRouter;