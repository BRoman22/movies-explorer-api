import statusCodes from './StatusCodes.js';

export default class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Conflict;
  }
}
