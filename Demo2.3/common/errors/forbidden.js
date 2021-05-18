const BaseError = require('./baseError');

class Forbidden extends BaseError {
    constructor(error) {
        super(403, error);
    }
};

module.exports = Forbidden;