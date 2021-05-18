const registerModel = require('./registerModel');
const registerViews = require('./registerViews');
const asyncHandler = require('../common/other/asyncHandler');

class RegisterController {
    handleRegistration = asyncHandler( async (req, res, next) => {
        const {user} = req.body;
        const result = await registerModel.insertUser(user);
        await registerViews.sendData(res, result);
    });
};

const registerController = new RegisterController();
module.exports = registerController;