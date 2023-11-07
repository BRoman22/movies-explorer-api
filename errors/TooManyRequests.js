import statusCodes from './StatusCodes.js';
import errMessages from './ErrorMessages.js';

export default class TooManyRequests extends Error {
  constructor() {
    super();
    this.statusCode = statusCodes.TooManyRequests;
    this.message = errMessages.tooManyRequests;
  }
}
