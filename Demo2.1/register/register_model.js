const DatabasePool = require('../common/other/pool_model');

class RegisterModel extends DatabasePool {

    async checkNew(user) {
        let { phone } = user
        const foundUser = await ordersModel.searchUser(phone);
        if (foundUser.length > 0) {
            return false
        }
        return true
    };
    
    async insertUser(user) {
        let { user_name, phone, email, password } = user;
        const newUser = this.checkNew(user);
        if (!newUser) return {status: 'error', data: [], message: 'Such phone is registered'}
        if (!email) {
            email = null;
        }
        const query = `
        INSERT INTO users (user_name, phone, password, email)
        VALUES ('${user_name}', '${phone}', '${password}', '${email}')`
        await this.pool.query(query);
        return { status: 'ok', data: [], message: 'Account is created' }
    }
};

const registerModel = new RegisterModel();
module.exports = registerModel;