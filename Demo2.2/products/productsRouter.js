const express = require('express');
const productsController = require('./products_controller');
const searchParamsDto = require('../common/dtos/search_params_dto');
const idDto = require('../common/dtos/id_dto');
const validator = require('express-joi-validation').createValidator({});
const productsRouter = express.Router();

productsRouter.get("/search", validator.query(searchParamsDto), productsController.selectSearchedProducts);
productsRouter.get("/:id", validator.params(idDto), productsController.selectProductDetails);
productsRouter.get("/", productsController.selectAllProducts);

module.exports = productsRouter;
