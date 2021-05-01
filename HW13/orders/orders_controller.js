const ordersModel = require('./orders_model');
const ordersViews = require('./orders_views');

class OrdersController {
    async handleOrder (req, res){
        const {products, user} = res.locals;
        console.log(res.locals)
        const order = await ordersModel.completeOrder(user, products);
        ordersViews.sendData(res, order);
    };
};

const ordersController = new OrdersController();
module.exports = ordersController;