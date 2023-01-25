const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');


/**
 * ===== Auth Middleware =====
 */
exports.isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Please Login to access this resource", 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    
    next();
});


/**
 * ==== Specific Role of User should have access of some resources ====
 * @param  {...any} roles 
 * @returns 
 */
exports.authorizeRoles = (...roles) => {
    return (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to use this resource`, 403));
        }
        next();
    };
};