const ErrorHandler = require('../utils/errorHandler');

/**
 * ---- To Handle The Global Error -----
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const globalErrorHandle = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB Cast Error Handling..
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // MongoDB Duplicate Key Error Handling..
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT Error Handling..
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid Json Web Token, Try again`;
        err = new ErrorHandler(message, 400);
    }

    // Expired JWT Error Handling..
    if (err.name === "TokenExpiredError") {
        const message = `Expired Json Web Token, Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = {
    globalErrorHandle,
};