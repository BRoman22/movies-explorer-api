import statusCodes from '../utils/statusCodes.js';

export default class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Unauthorized;
  }
}
