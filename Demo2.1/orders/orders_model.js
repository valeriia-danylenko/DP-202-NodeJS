const db = require('../db/models/index');
const { Op } = require('sequelize');

class OrdersModel {

    async retrieveIdAmount(products) {
        const ids = products.map(el => el.id);
        const idQuery = `WHERE id IN ( ${ids.join(', ')} )`;

        const rawProducts = await db.Product.findAll({
            attributes: ['id', 'amount'],
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });
        const foundProducts = rawProducts.map(p => p.dataValues)
        return foundProducts
    };

    async checkIdExists(products, rows) {
        const foundIds = rows.map(product => product.id);
        const idNotExist = products.filter(product => {
            return !foundIds.includes(product.id)
        }).map(el => {
            return { 'id': el.id }
        });
        return idNotExist
    }

    async checkAvailability(products, rows) {
        const notEnoughProducts = rows.filter(el => {
            const item = products.find(val => { return val.id === el.id; })
            if (item.count > el.amount) { return el };
        });
        return notEnoughProducts
    }


    async findUserByPhone(phoneNum) {
        const rawUser = await db.User.findAll({
            attributes: ['id', 'user_name', 'phone', 'password', 'email'],
            where: {
                phone: phoneNum
            }
        });
        const user = rawUser.map(u => u.dataValues);
        return user;
    }

    async inserOrderItems(products, id) {
        const queryArr = products.reduce((acc, product) => {
            console.log({ order_id: id, product_id: product.id, amount: product.count })
            acc.push({ order_id: id, product_id: product.id, amount: product.count })
            return acc;
        }, []);
        await db.Order_item.bulkCreate(queryArr);
    }


    async insertOrder(user, products) {
        const { id } = user;
        const order = await db.Order.create({
            user_id: id
        });
        const orderID = order.dataValues.id
        await this.inserOrderItems(products, orderID);
        return orderID;

    }

    async selectOrderInfo(orderID) {

        const user = await db.Order.findOne({
            attributes: [
                [db.Sequelize.literal('"user"."user_name"'), 'user_name'],
                [db.Sequelize.literal('"user"."phone"'), 'phone'],
                [db.Sequelize.literal('"user"."email"'), 'email'],
                'time'
            ],
            where: { id: orderID },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: []
                }
            ]
        });

        const rawOrder = await db.Order_item.findAll({
            attributes: [
                'order_id',
                'product_id',
                [db.Sequelize.literal('product.name'), 'name'],
                'amount',
                [db.Sequelize.literal('"product->unit"."units"'), 'units'],
                [db.Sequelize.literal('"product"."price"'), 'price'],
                [db.Sequelize.literal('"product"."price" * order_item.amount'), 'total_per_item']
            ],
            where: { order_id: orderID },
            include: [
                {
                    model: db.Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        {
                            model: db.Unit,
                            as: 'unit',
                            attributes: [],
                        }
                    ]
                }
            ]
        });
        const order = rawOrder.map(el => el.dataValues);

        const total = await db.Order_item.findOne({
            attributes: [
                [db.sequelize.fn('sum', db.Sequelize.literal('"product"."price" * order_item.amount')), 'total_amount']
            ],
            include: [
                {
                    model: db.Product,
                    as: 'product',
                    attributes: []
                }
            ],
            group: ['order_id'],
            having: { order_id: orderID }
        });

        const orderInfo = {
            'user': user.dataValues,
            'order': order,
            'total': total.dataValues.total_amount
        };
        return orderInfo
    }

    async completeOrder(user, products) {
        const orderID = await this.insertOrder(user, products)
        const orderInfo = await this.selectOrderInfo(orderID);
        return orderInfo;
    }
};


const ordersModel = new OrdersModel();
module.exports = ordersModel;