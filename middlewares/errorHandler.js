import statusCodes from '../utils/statusCodes.js';
import responseText from '../utils/responseText.js';

export default function errorHandler(err, req, res, next) {
  const { statusCode = statusCodes.InternalServerError, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === statusCodes.InternalServerError
        ? responseText.error.internalServerError
        : message,
  });
  next();
}
