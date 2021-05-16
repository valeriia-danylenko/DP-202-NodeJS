const express = require('express');
const productsController = require('./productsController');
const searchParamsDto = require('../common/dtos/searchParamsDto');
const idDto = require('../common/dtos/idDto');
const validator = require('express-joi-validation').createValidator({});
const productsRouter = express.Router();

productsRouter.get("/search", validator.query(searchParamsDto), productsController.selectSearchedProducts);
productsRouter.get("/:id", validator.params(idDto), productsController.selectProductDetails);
productsRouter.get("/", productsController.selectAllProducts);

module.exports = productsRouter;
