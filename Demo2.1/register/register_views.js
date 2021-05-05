class RegisterViews {
    async sendData(res, result) {
        res.json(result);
    }
};

const registerViews = new RegisterViews();
module.exports = registerViews;