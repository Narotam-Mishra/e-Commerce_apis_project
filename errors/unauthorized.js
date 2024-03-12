
// custom error handling for unauthorized user

const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;