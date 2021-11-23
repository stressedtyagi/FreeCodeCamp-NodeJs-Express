// fn - async function is passed as parameter to asyncWrapper
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // With next we pass it to next middleware i.e. in this case is error-handler.js
            // Check documentation for error handler on express.js website
            next(error);
        }
    };
};

module.exports = asyncWrapper;
