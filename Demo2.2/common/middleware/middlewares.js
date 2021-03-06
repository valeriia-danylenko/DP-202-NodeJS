const ordersModel = require('../../orders/orders_model');
const { NotFound, Forbidden, CustomError, NotAcceptable } = require('../other/errors');


const authMiddleware = async function (req, res, next) {
    const { phone, password } = req.headers;
    const foundUser = await ordersModel.searchUser(phone);
    if (foundUser.length === 0) {
        res.locals.isAuthenticated = false;
        next(new NotFound('Such phone number is not registered'));
    } else if (foundUser[0].password != password) {
        res.locals.isAuthenticated = false;
        next(new Forbidden('Incorrect email'));
    } else {
        res.locals.user = foundUser[0];
        res.locals.isAuthenticated = true;
        next();
    }
};

const checkProducts = async function (req, res, next) {
    const { products } = req.body;
    const foundProducts = await ordersModel.retrieveIdAmount(products);
    const idNotExist = await ordersModel.checkIdExists(products, foundProducts);
    if (idNotExist.length > 0) {
        next(new CustomError(idNotExist, 'Such products are not found'));
    };
    const notAvailable = await ordersModel.checkAvailability(products, foundProducts);
    if (notAvailable.length > 0) {
        next(new CustomError(notAvailable, 'Not enough products'));
    }
    res.locals.products = products;
    next();
};

// const checkUserExist = async function (req, res, next) {
//     let { user_name, password, phone, email } = req.headers;
//     const foundUser = await ordersModel.searchUser(phone);
//     if (foundUser.length > 0) {
//         next(new NotAcceptable('This phone is already registered'))
//     }
//     if (!email) {
//         email = null;
//     }
//     res.locals.user = { user_name: user_name, password: password, phone: phone, email: email };
//     next()
// };

module.exports = {
    checkProducts,
    authMiddleware
    // checkUserExist
}
