const Joi = require('joi');

const loginUserDto = Joi.object().keys({
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
}).required().unknown(true);

module.exports = loginUserDto;