const ordersModel = require('../../orders/ordersModel');
const NotFoundData = require('../errors/notFoundData');
const Forbbiden = require('../errors/forbidden');


const checkProductsMiddleware = async function (req, res, next) {
    const { products } = req.body;
    const foundProducts = await ordersModel.retrieveIdAmount(products);
    const idNotExist = await ordersModel.checkIdExists(products, foundProducts);
    if (idNotExist.length > 0) {
        next(new NotFoundData(idNotExist, 'Such products are not found'));
    };
    const notAvailable = await ordersModel.checkAvailability(products, foundProducts);
    if (notAvailable.length > 0) {
        next(new NotFoundData(notAvailable, 'Not enough products'));
    }
    res.locals.products = products;
    next();
};

module.exports = checkProductsMiddleware;
