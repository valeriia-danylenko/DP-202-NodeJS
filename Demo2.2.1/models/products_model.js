const DatabasePool = require('./pool_model.js');

class ProductsModel extends DatabasePool {

    validateCategories(categories) {
        let validCategories = [];
        if (categories) {
            validCategories = categories.split(',').filter(category => Number(category));
        }
        return validCategories;
    }

    createWhereQuery(query) {

        let { categories, products, manufactures } = query;
        const validCategories = this.validateCategories(categories);

        let whereQuery = '';
        if (Object.keys(query).length === 0) return whereQuery;
        if (validCategories.length > 0 || products || manufactures) {
            const queryArr = [];
            if (validCategories.length > 0) {
                const categoryQuery = '';
                queryArr.push(categoryQuery.concat('category_id IN (', validCategories.join(', '), ')'));
            }
            if (products) {
                queryArr.push(`UPPER(name) LIKE '%${products.toUpperCase()}%'`);
            }
            if (manufactures) {
                queryArr.push(`UPPER(manufacture) LIKE '%${manufactures.toUpperCase()}%'`);
            }
            return whereQuery.concat('WHERE ', queryArr.join(' AND '));
        }

        return whereQuery;
    }

    async selectProducts(query) {
        const whereQuery = this.createWhereQuery(query);
        const selector = `
            SELECT products.id, name, manufacture, category, units, price, img_link 
            FROM products 
            JOIN manufactures ON products.manufacture_id = manufactures.id 
            JOIN categories ON products.category_id = categories.id 
            JOIN units ON products.units_id = units.id
        ${whereQuery};`;
        const { rows } = await this.pool.query(selector);
        return rows;
    }

    async selectProductDetails(id) {
        if (!Number(id)) return [];
        const selector = `
            SELECT products.id, name, manufacture, category, units, price, img_link, ingridients
            FROM products 
            JOIN manufactures ON products.manufacture_id = manufactures.id
            JOIN categories ON products.category_id = categories.id
            JOIN units ON products.units_id = units.id
            WHERE products.id = ${id};`;
        const { rows } = await this.pool.query(selector);
        return rows;
    }
};

const productsModel = new ProductsModel();
module.exports = productsModel;