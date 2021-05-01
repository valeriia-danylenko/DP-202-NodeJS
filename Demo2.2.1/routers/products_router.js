const express = require('express');
const productsController = require('../controllers/products_controller.js');
const productsRouter = express.Router();

productsRouter.use("/search", productsController.selectSearchedProducts);
productsRouter.use("/:id", productsController.selectProductDetails);
productsRouter.use("/", productsController.selectAllProducts);

module.exports = productsRouter;
