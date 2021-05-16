const express = require('express');
const registerController = require('./register_controller.js');
const registerRouter = express.Router();
const validator = require('express-joi-validation').createValidator({});
const createUserDto = require('../common/dtos/create_user_dto');

registerRouter.post("/", validator.body(createUserDto), registerController.handleRegistration);

module.exports = registerRouter; 