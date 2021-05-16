const BaseError = require('./base_error');

class Forbidden extends BaseError {
    constructor(error) {
        super(403, error);
    }
};

module.exports = Forbidden;