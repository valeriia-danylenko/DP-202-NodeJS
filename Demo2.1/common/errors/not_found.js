const BaseError = require('./base_error');

class NotFound extends BaseError {
    constructor(error) {
        super(404, error);
    }
};

module.exports = NotFound;