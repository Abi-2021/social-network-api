const errorHandler = (err, res, req, next) => {
    console.log(err.stack);

    res.status(err.statusCode || 5500).json({
        sucess: false,
        error: err.message || 'Server Error',
    });
};

module.exports = errorHandler;