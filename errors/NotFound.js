import statusCodes from './StatusCodes.js';

export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NotFound;
  }
}
