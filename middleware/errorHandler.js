const errorHandler = (err, req, req, next) => {
    console.log(err.stack);

    res.status(err.statusCode || 500).json({
        sucess: false,
        error: err.message || 'Server Error',
    });
};

module.exports = errorHandler;