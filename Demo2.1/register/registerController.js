const registerModel = require('./register_model');
const registerViews = require('./register_views');
const asyncHandler = require('../common/other/async_handler');

class RegisterController {
    handleRegistration = asyncHandler( async (req, res, next) => {
        const {user} = req.body;
        const result = await registerModel.insertUser(user);
        await registerViews.sendData(res, result);
    });
};

const registerController = new RegisterController();
module.exports = registerController;