const productsModel = require('../models/products_model');
const productsViews = require('../views/products_views');

class ProductsController {
    async selectAllProducts (req, res){
        const allProducts = await productsModel.selectProducts(req.query); 
        productsViews.sendData(res, allProducts, 'all');
    }
    async selectSearchedProducts (req, res){
        const searchedProducts = await productsModel.selectProducts(req.query); 
        productsViews.sendData(res, searchedProducts, 'search');
    }
    async selectProductDetails (req, res){
        const id = req.params.id;
        const productDetails = await productsModel.selectProductDetails(id); 
        productsViews.sendData(res, productDetails, 'id', id);
    }
};

const productsController = new ProductsController();
module.exports = productsController;