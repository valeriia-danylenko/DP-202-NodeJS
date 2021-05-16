const { Unit, Product, Order_item, User, Order, sequelize } = require('../db/models/index');
const { Op } = require('sequelize');
const { normalize, delExtra, normalizeOne, deleteKeys}  = require('../common/other/dataNormalization');
const {pricePerItem, totalPrice} = require('../common/other/calculations');

class OrdersModel {

    async retrieveIdAmount(products) {
        const ids = products.map(el => el.id);
        const rawProducts = await Product.findAll({
            attributes: ['id', 'amount'],
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });
        const foundProducts = normalize(rawProducts)
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
        const rawUser = await User.findAll({
            attributes: ['id', 'user_name', 'phone', 'password', 'email'],
            where: {
                phone: phoneNum
            }
        });
        const user = normalize(rawUser);
        return user;
    }

    async inserOrderItems(products, id, t) {
        const queryArr = products.reduce((acc, product) => {
            acc.push({ order_id: id, product_id: product.id, amount: product.count })
            return acc;
        }, []);
        await Order_item.bulkCreate(queryArr, { transaction: t });
    }


    async insertOrder(user, products, t) {
        const { id } = user;
        const order = await Order.create({
            user_id: id
        }, { transaction: t });
        const orderID = order.dataValues.id
        await this.inserOrderItems(products, orderID, t);
        return orderID;

    }

    async selectOrderInfo(orderID) {

        const rawUser = await Order.findOne({
            attributes: [
                'time'
            ],
            where: { id: orderID },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_name', 'phone', 'email']
                }
            ]
        });

        let user = normalizeOne(rawUser, [{user: ['user_name', 'phone', 'email']}]);
        user = deleteKeys(user, ['user'])

        const rawOrder = await Order_item.findAll({
            attributes: [
                'order_id',
                'product_id',
                'amount',
            ],
            where: { order_id: orderID },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['name', 'price'],
                    include: [
                        {
                            model: Unit,
                            as: 'unit',
                            attributes: ['unit']
                        }
                    ]
                }
            ]
        });

        let order = normalize(rawOrder, [{ product: ['name', 'price', { unit: ['unit'] }] }]);
        order = delExtra(order, ['product'])
        order = pricePerItem(order);

        const orderInfo = {
            'user': user, 
            'order': order,
            'total': totalPrice(order)
        };
        return orderInfo
    }

    async completeOrder(user, products) {
        let orderID;
        const result = await sequelize.transaction(async (t) => {
            orderID = await this.insertOrder(user, products, t)
        });
        const orderInfo = await this.selectOrderInfo(orderID);
        return orderInfo;

    }
};


const ordersModel = new OrdersModel();
module.exports = ordersModel;