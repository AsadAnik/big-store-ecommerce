/**
 * ---- To Handle Try Catch Errors -----
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const catchAsyncErrorHandle = (controllerFunc) => (req, res, next) => {
    Promise.resolve(controllerFunc(req, res, next)).catch(next);
};

module.exports = catchAsyncErrorHandle;