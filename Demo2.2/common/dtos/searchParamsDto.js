const Joi = require('joi');

const searchParamsDto = Joi.object().keys({
    categories: Joi.string().pattern(/^[0-9,]+$/).allow(''),
    manufactures: Joi.string().allow(''),
    products: Joi.string().allow('')
}).unknown(true);

module.exports = searchParamsDto;

