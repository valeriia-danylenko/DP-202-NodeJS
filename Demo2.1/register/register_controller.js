const registerModel = require('./register_model');
const registerViews = require('./register_views');

class RegisterController {
    async handleRegistration (req, res){
        const {user} = res.locals;
        const result = await registerModel.insertUser(user);
        registerViews.sendData(res, result);
    };
};

const registerController = new RegisterController();
module.exports = registerController;