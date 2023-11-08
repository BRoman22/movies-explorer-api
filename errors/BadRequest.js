import statusCodes from '../utils/statusCodes.js';

export default class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BadRequest;
  }
}
