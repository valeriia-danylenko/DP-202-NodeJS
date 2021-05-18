const express = require('express');
const registerController = require('./registerController.js');
const registerRouter = express.Router();
const validator = require('express-joi-validation').createValidator({});
const createUserDto = require('../common/dtos/createUserDto');

registerRouter.post("/", validator.body(createUserDto), registerController.handleRegistration);

module.exports = registerRouter; 