const { Product, Manufacture, Unit, Category } = require('../db/models/index');
const { Op } = require("sequelize");
const { normalize } = require('../common/other/dataNormalization');

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
        const rawProducts = await Product.findAll({
            attributes: [
                'id',
                'name',
                'price',
                'img_link'
            ],
            where: whereQuery,
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['category']
                },
                {
                    model: Manufacture,
                    as: 'manufacture',
                    attributes: ['manufacture']
                },
                {
                    model: Unit,
                    as: 'unit',
                    attributes: ['unit']
                }
            ]
        })
        const products = await normalize(rawProducts, [{category: ['category']}, {manufacture: ['manufacture']}, {unit: ['unit']}]);
        return products;
    };

    async selectProductDetails(id) {
        const rawProduct = await Product.findAll({ //used findAll to get an empty array if id doesn't exist
            attributes: [
                'id',
                'name',
                'ingridients',
                'price',
                'img_link'
            ],
            where: { id: id },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['category']
                },
                {
                    model: Manufacture,
                    as: 'manufacture',
                    attributes: ['manufacture']
                },
                {
                    model: Unit,
                    as: 'unit',
                    attributes: ['unit']
                }
            ]
        });
        const product = await normalize(rawProducts, [{category: ['category']}, {manufacture: ['manufacture']}, {unit: ['unit']}]);
        return product;
    };
};

const productsModel = new ProductsModel();
module.exports = productsModel;