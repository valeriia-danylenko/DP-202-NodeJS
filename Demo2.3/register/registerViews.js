class RegisterViews {
    messages = {
        ok: {success: true, data: [], message: 'New user is created'}
    }

    async sendData(res, newUserId) {
        if (newUserId) {
            res.json(this.messages.ok);
        }
    }
};

const registerViews = new RegisterViews();
module.exports = registerViews;