const ordersModel = require('../../orders/ordersModel');
const NotFound = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');


const authMiddleware = async function (req, res, next) {
    const { phone, password } = req.headers;
    const foundUser = await ordersModel.findUserByPhone(phone);
    if (foundUser.length === 0) {
        res.locals.isAuthenticated = false;
        next(new NotFound('Such phone number is not registered'));
    } else if (foundUser[0].password != password) {
        res.locals.isAuthenticated = false;
        next(new Forbidden('Incorrect password'));
    } else {
        res.locals.user = foundUser[0];
        res.locals.isAuthenticated = true;
        next();
    }
};


module.exports = authMiddleware;
