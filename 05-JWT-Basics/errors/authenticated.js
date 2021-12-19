const CustomerAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomerAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;
