class BaseError extends Error {
    constructor(statusCode, error) {
        super();
        this.statusCode = statusCode;
        this.error = error;
    }
};

class NotFound extends BaseError {
    constructor(error) {
        super(404, error);
    }
};

class NotAcceptable extends BaseError {
    constructor(error) {
        super(406, error)
    }
};

class Forbidden extends BaseError {
    constructor(error) {
        super(403, error);
    }
};

class CustomError extends BaseError {
    constructor(data, error) {
        super(200, error);
        this.data = data;
    }
};

module.exports = {
    Forbidden,
    NotFound,
    CustomError,
    NotAcceptable
}