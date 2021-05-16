const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./products/products_router.js');
const ordersRouter = require('./orders/orders_router.js');
const registerRouter = require('./register/register_router.js')
const validator = require('express-joi-validation').createValidator({});
const loginUserDto = require('./common/dtos/login_user_dto');
const authMiddleware = require('./common/middleware/auth_middleware');
const errorHandler = require('./common/middleware/error_middleware.js')
const dotenv = require('dotenv');
const NotFound = require('./common/errors/not_found.js');
const {sequelize} = require('./db/models/index')

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())

sequelize.authenticate()
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err))

app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/order', validator.headers(loginUserDto), authMiddleware, ordersRouter);

app.use(function (req, res, next) {
    next(new NotFound('This page doesn\'t exist'))
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000);