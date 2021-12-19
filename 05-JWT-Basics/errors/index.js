const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const UnauthenticatedError = require("./authenticated");

module.exports = { CustomAPIError, BadRequest, UnauthenticatedError };
