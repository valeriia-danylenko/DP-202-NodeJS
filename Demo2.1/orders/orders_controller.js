const ordersModel = require('./orders_model');
const ordersViews = require('./orders_views');
const asyncHandler = require('../common/other/async_handler');

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