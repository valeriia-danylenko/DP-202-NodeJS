const express = require('express');
const productsController = require('./products_controller');
const productsRouter = express.Router();
const {searchParamsDto, idDto} = require('../common/other/dto.js');
const validator = require('express-joi-validation').createValidator({});

productsRouter.use("/search", validator.query(searchParamsDto), productsController.selectSearchedProducts);
productsRouter.use("/:id", validator.params(idDto), productsController.selectProductDetails);
productsRouter.use("/", productsController.selectAllProducts);

module.exports = productsRouter;
