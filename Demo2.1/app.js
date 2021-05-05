const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./products/products_router.js');
const ordersRouter = require('./orders/orders_router.js');
const registerRouter = require('./register/register_router.js')
const validator = require('express-joi-validation').createValidator({});
const {loginUserDto} = require('./common/other/dto.js')
const {authMiddleware} = require('./common/middleware/middlewares.js');
const errorHandler = require('./common/middleware/error_middleware.js')
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())

app.use("/register", registerRouter);
app.use("/products", productsRouter);
app.use("/order", validator.headers(loginUserDto), authMiddleware, ordersRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.use(errorHandler);
 
app.listen(3000);