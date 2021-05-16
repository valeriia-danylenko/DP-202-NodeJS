const BaseError = require('./baseError');

class NotFound extends BaseError {
    constructor(error) {
        super(404, error);
    }
};

module.exports = NotFound;