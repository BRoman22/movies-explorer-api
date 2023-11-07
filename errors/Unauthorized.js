import statusCodes from './StatusCodes.js';
import errMessages from './ErrorMessages.js';

export default class Unauthorized extends Error {
  constructor() {
    super();
    this.statusCode = statusCodes.Unauthorized;
    this.message = errMessages.unauthorized;
  }
}
