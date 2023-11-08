import statusCodes from '../utils/statusCodes.js';

export default class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Forbidden;
  }
}
