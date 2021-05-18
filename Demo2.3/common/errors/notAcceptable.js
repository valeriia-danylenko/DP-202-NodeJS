const BaseError = require('./baseError');

class NotAcceptable extends BaseError {
    constructor(error) {
        super(406, error)
    }
};

module.exports = NotAcceptable;