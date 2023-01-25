class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        // To Get the Stack type error...
        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = ErrorHandler;