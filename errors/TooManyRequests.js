import statusCodes from '../utils/statusCodes.js';

export default class TooManyRequests extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.TooManyRequests;
  }
}
