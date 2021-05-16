const BaseError = require('./base_error');

class NotFoundData extends BaseError {
    constructor(data, error) {
        super(404, error);
        this.data = data;
    }
};

module.exports = NotFoundData