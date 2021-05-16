const ordersModel = require('./ordersModel');
const ordersViews = require('./ordersViews');
const asyncHandler = require('../common/other/asyncHandler');

class OrdersController {

    handleOrder = asyncHandler(async (req, res, next) => {
        if (res.locals.isAuthenticated) {
            const { products, user } = res.locals;
            const order = await ordersModel.completeOrder(user, products);
            await ordersViews.sendData(res, order);
        }
    });
};

const ordersController = new OrdersController();
module.exports = ordersController;