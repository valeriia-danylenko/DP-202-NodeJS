const db = require('../db/models/index');
const { Op } = require("sequelize");

class ProductsModel {
    createWhereQuery(query) {
        let { categories, products, manufactures } = query;
        if (Object.keys(query).length === 0) return {};
        if (categories || products || manufactures) {
            const queryArr = [];
            if (categories) {
                const inArr = categories.split(',')
                queryArr.push({ category_id: { [Op.in]: inArr } });
            }
            if (products) {
                queryArr.push({ name: { [Op.iLike]: `%${products}%` } });
            }
            if (manufactures) {
                queryArr.push({ '$manufacture.manufacture$': { [Op.iLike]: `%${manufactures}%` } });
            };
            const whereQuery = { [Op.and]: queryArr };
            return whereQuery;
        }
    };

    async selectProducts(query) {
        const whereQuery = this.createWhereQuery(query);
        const rawProducts = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                [db.Sequelize.literal('manufacture.manufacture'), 'manufactures'],
                [db.Sequelize.literal('category.category'), 'categories'],
                [db.Sequelize.literal('unit.units'), 'units'],
                'price',
                'img_link'
            ],
            where: whereQuery,
            include: [
                {
                    model: db.Category,
                    as: 'category',
                    attributes: []
                },
                {
                    model: db.Manufacture,
                    as: 'manufacture',
                    attributes: []
                },
                {
                    model: db.Unit,
                    as: 'unit',
                    attributes: []
                }
            ]
        })
        const products = rawProducts.map(product => product.dataValues);
        return products;
    };

    async selectProductDetails(id) {
        const rawProduct = await db.Product.findAll({ //used findAll to get an empty array if id doesn't exist
            attributes: [
                'id',
                'name',
                [db.Sequelize.literal('manufacture.manufacture'), 'manufactures'],
                [db.Sequelize.literal('category.category'), 'categories'],
                [db.Sequelize.literal('unit.units'), 'units'],
                'ingridients',
                'price',
                'img_link'
            ],
            where: { id: id },
            include: [
                {
                    model: db.Category,
                    as: 'category',
                    attributes: []
                },
                {
                    model: db.Manufacture,
                    as: 'manufacture',
                    attributes: []
                },
                {
                    model: db.Unit,
                    as: 'unit',
                    attributes: []
                }
            ]
        });
        const product = rawProduct.map(product => product.dataValues);
        return product;
    };
};

const productsModel = new ProductsModel();
module.exports = productsModel;