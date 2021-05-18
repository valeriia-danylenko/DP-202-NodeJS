module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
        res.status(err.statusCode).json({
            success: false,
            error: err.error || 'Server error',
            data: err.data
        });
};

