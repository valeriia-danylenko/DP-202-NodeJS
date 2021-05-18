const Joi = require('joi');

const idDto = Joi.object().keys({
    id: Joi.string().pattern(/^[0-9,]+$/).required()
});

module.exports = idDto;