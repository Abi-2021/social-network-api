const colors = require('colors');

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    if(err.name === 'CastError') {
        res.status(404).json({success: false, error: err.message})
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error',
    });
};

module.exports = errorHandler;
