const Joi = require('joi');


const createUserDto = Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email()
}).required();

const loginUserDto = Joi.object().keys({
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
}).required();

const productDto = Joi.object().keys({
    id: Joi.number().integer().required(),
    count: Joi.number().integer().min(1).required()
}).required();

const productsArrDto = Joi.object().keys({
    products: Joi.array().items(productDto)
});

const searchParamsDto = Joi.object().keys({
    categories: Joi.string().pattern(/^[0-9,]+$/),
    manufactures: Joi.string(),
    products: Joi.string()
});

const idDto = Joi.object().keys({
    id: Joi.string().pattern(/^[0-9,]+$/).required()
})

module.exports = {
    createUserDto,
    loginUserDto,
    productsArrDto,
    searchParamsDto,
    idDto
};

