const Joi = require('joi');

const productDto = Joi.object().keys({
    id: Joi.number().integer().required(),
    count: Joi.number().integer().min(1).required()
}).required().unknown(true);

const productsDto = Joi.object().keys({
    products: Joi.array().items(productDto)
}).unknown(true);

module.exports = productsDto;
