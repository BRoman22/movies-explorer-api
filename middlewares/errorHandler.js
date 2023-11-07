import statusCodes from '../errors/StatusCodes.js';
import errMessages from '../errors/ErrorMessages.js';

export default function errorHandler(err, req, res, next) {
  const { statusCode = statusCodes.InternalServerError, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === statusCodes.InternalServerError ? errMessages.internalServerError : message,
  });
  next();
}
