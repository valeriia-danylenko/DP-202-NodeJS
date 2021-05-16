const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./products/productsRouter.js');
const ordersRouter = require('./orders/ordersRouter.js');
const registerRouter = require('./register/registerRouter.js')
const validator = require('express-joi-validation').createValidator({});
const loginUserDto = require('./common/dtos/loginUserDto');
const authMiddleware = require('./common/middleware/authMiddleware');
const errorHandler = require('./common/middleware/errorMiddleware.js')
const dotenv = require('dotenv');
const NotFound = require('./common/errors/notFound.js');
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

// app.use(errorHandler);

app.listen(process.env.PORT || 3000);