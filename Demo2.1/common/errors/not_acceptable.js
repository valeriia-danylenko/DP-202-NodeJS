const BaseError = require('./base_error');

class NotAcceptable extends BaseError {
    constructor(error) {
        super(406, error)
    }
};

module.exports = NotAcceptable;