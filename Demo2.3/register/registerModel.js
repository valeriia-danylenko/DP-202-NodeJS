const { User } = require('../db/models/index');
const ordersModel = require('../orders/ordersModel');
const Forbidden = require('../common/errors/forbidden');

class RegisterModel {

    async checkUserExistByPhone(phone) {
        const foundUser = await ordersModel.findUserByPhone(phone);
        return Boolean(foundUser.length)
    };

    async insertUser(user) {
        let { name, phone, email, password } = user;
        const userExist = await this.checkUserExistByPhone(phone);
        if (userExist) {
            throw new Forbidden('Such phone is registered')
        }
        if (!email) {
            email = null;
        }
        const newUser = await User.create({
            user_name: name,
            phone,
            password,
            email
        });
        return newUser.dataValues.id
    }
};

const registerModel = new RegisterModel();
module.exports = registerModel;