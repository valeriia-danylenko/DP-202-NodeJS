const ordersModel = require('../models/orders_model.js');
const ordersViews = require('../views/orders_views');

class OrdersController {
    async handleOrder (req, res){
        const {products, user} = req.body;
        const order = await ordersModel.completeOrder(user, products);
        ordersViews.sendData(res, order);
    };
};

const ordersController = new OrdersController();
module.exports = ordersController;