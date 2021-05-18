const productsModel = require('./productsModel');
const productsViews = require('./productsViews');
const asyncHandler = require('../common/other/asyncHandler');

class ProductsController {
    selectAllProducts = asyncHandler( async  (req, res, next) => {
        const allProducts = await productsModel.selectProducts(req.query); 
        await productsViews.sendData(res, allProducts, 'all');
    });

    selectSearchedProducts = asyncHandler (async  (req, res, next) => {
        const searchedProducts = await productsModel.selectProducts(req.query); 
        await productsViews.sendData(res, searchedProducts, 'search');
    });

    selectProductDetails = asyncHandler( async (req, res, next) => {
        const id = req.params.id;
        const productDetails = await productsModel.selectProductDetails(id); 
        await productsViews.sendData(res, productDetails, 'id', id);
    });
};

const productsController = new ProductsController();
module.exports = productsController;