const constants = require('../constant.js');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
      break;
    case constants.UNAUTHRIZED:
      res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server error", message: err.message, stackTrace: err.stack });
      break;
    default:
      res.status(statusCode).json({ title: "Unknown error", message: err.message, stackTrace: err.stack });
      break;
  }
};

module.exports = errorHandler;
