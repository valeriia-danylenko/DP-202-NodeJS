const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routers/products_router.js');
const ordersRouter = require('./routers/orders_router.js');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())

app.use("/products", productsRouter);
app.use("/order", ordersRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
app.listen(3000);