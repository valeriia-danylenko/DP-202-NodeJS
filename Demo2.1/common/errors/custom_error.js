const BaseError = require('./base_error');

class CustomError extends BaseError {
    constructor(data, error) {
        super(200, error);
        this.data = data;
    }
};


module.exports = CustomError;