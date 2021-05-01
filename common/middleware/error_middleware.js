module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    if (err.data) {
        res.status(err.statusCode).json({
            success: false,
            error: err.error || 'Server error',
            data: err.data
        });
    } else {
        res.status(err.statusCode).json({
            success: false,
            error: err.error || 'Server error'
        });
    };
};

