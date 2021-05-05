const express = require('express');
const registerController = require('./register_controller.js');
const registerRouter = express.Router();
const validator = require('express-joi-validation').createValidator({})
// const { checkUserExist } = require('../common/middleware/middlewares.js')
const { createUserDto } = require('../common/other/dto.js')

registerRouter.post("/", validator.body(createUserDto), registerController.handleOrder);

module.exports = registerRouter;  