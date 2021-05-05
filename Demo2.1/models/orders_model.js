const DatabasePool = require('./pool_model.js');

class OrdersModel extends DatabasePool {
    validateUser(user) {
        const { name, phone, email } = user;
        const validValues = {
            name: /^[A-Za-z ]{2,30}$/g,
            phone: /^[0-9]{12}$/g,
            email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        };
        user.name = name.match(validValues.name) ? name.match(validValues.name)[0] : false;
        user.phone = phone.match(validValues.phone) ? phone.match(validValues.phone)[0] : false;
        user.email = null;
        if (email) {
            user.email = email.match(validValues.email) ? email.match(validValues.email)[0] : null;
        }
        return user
    }

    validateProductsArr(products) {
        const invalidProducts = products.filter(product => {
            return typeof product.id !== 'number' || typeof product.count !== 'number' || product.id <= 0 || product.count <=0
        })
        return invalidProducts
    }

    async retrieveIdAmount(products) {
        const ids = products.map(el => el.id);
        const idQuery = `WHERE id IN ( ${ids.join(', ')} )`;
        const { rows } = await this.pool.query(`
            SELECT id, amount FROM products
            ${idQuery};`);
        return rows
    }

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

    async searchUser(phone) {
        const selector = `
            SELECT phone
            FROM users
            WHERE phone = '${phone}';`;
        const { rows } = await this.pool.query(selector);
        return rows.length === 0;
    }

    async inserOrderItems(products, id) {
        const queryArr = products.reduce((acc, product) => {
            acc.push(`( ${id}, ${product.id}, ${product.count} )`);
            return acc;
        }, []);
        await this.pool.query(`
            INSERT INTO order_items (order_id, product_id, amount)
            VALUES ${queryArr.join(', ')};`);
    }

    async insertOrder(user, products) {
        const { name, phone, email } = user;
        const newUser = await (this.searchUser(phone));
        if (newUser) {
            await this.pool.query(
                `INSERT INTO users (user_name, phone, email)
                VALUES ('${name}', '${phone}', '${email}');`);
        };
        const order = await this.pool.query(
            `INSERT INTO orders (user_id)
            VALUES ((SELECT id
            FROM users
            WHERE phone = '${phone}'))
            RETURNING id;`);

        const orderID = order.rows[0].id;
        await this.inserOrderItems(products, orderID);
        return orderID;
    }

    async selectOrderInfo(orderID) {
        const userQuery = `
            SELECT user_name, phone, email, time
            FROM orders
            JOIN users ON orders.user_id = users.id
            WHERE orders.id = ${orderID};`

        const orderQuery = `
            SELECT order_id, product_id, products.name, order_items.amount, units, price, price*order_items.amount AS total_per_item
            FROM order_items
            JOIN products ON order_items.product_id = products.id
            JOIN units on products.units_id = units.id
            WHERE order_id = ${orderID}`

        const totalQuery = `
            SELECT SUM(price*order_items.amount)
            FROM products
            JOIN order_items ON product_id = products.id
            WHERE order_id = ${orderID};`

        const user = await this.pool.query(userQuery)
        user.rows[0].time =  new Date(user.rows[0].time).toLocaleString()
        const order = await this.pool.query(`${orderQuery};`)
        const total = await this.pool.query(totalQuery);

        const orderInfo = {
            'user': user.rows[0],
            'order': order.rows,
            'total': total.rows[0].sum
        };
        return orderInfo
    }

    async completeOrder(user, products) {
        const msg = { status: 'ok', data: [] }

        const validatedUser = this.validateUser(user);
        if (!validatedUser.name || !validatedUser.phone) {
            msg.status = 'errorUser';
            return msg;
        }

        const invalidProducts = this.validateProductsArr(products);
        if (products.length === 0 || invalidProducts.length > 0) {
            msg.status = 'errorProducts';
            msg.data = invalidProducts;
            return msg;
        }

        const rows = await this.retrieveIdAmount(products);
        const idNotExist = await this.checkIdExists(products, rows);
        if (idNotExist.length > 0) {
            msg.status = 'errorProducts';
            msg.data = idNotExist;
            return msg;
        };

        const notAvailable = await this.checkAvailability(products, rows);
        if (notAvailable.length > 0) {
            msg.status = 'errorAvailability';
            msg.data = notAvailable;
            return msg;
        };

        const orderID = await this.insertOrder(validatedUser, products)
        const orderInfo = await this.selectOrderInfo(orderID);
        msg.data = orderInfo;
        return msg;
    }
};

const ordersModel = new OrdersModel();
module.exports = ordersModel;