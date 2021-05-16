const BaseError = require('./baseError');

class NotFoundData extends BaseError {
    constructor(data, error) {
        super(404, error);
        this.data = data;
    }
};

module.exports = NotFoundData