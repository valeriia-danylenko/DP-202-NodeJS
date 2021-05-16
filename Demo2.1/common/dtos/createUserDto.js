const Joi = require('joi');

const userDto = Joi.object().keys({
    name: Joi.string().min(2).max(30).pattern(/^[A-Za-z ]+$/).required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email()
}).required();

const createUserDto = Joi.object().keys({
    user: userDto
}).unknown(true);

module.exports = createUserDto;