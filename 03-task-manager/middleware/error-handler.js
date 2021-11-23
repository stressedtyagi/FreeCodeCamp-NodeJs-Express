const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msq: err.message });
    }
    return res.status(500).json({ msg: `Something went wrong ! Try Again` });
};

module.exports = errorHandlerMiddleware;
