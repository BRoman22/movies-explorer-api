import { rateLimit } from 'express-rate-limit';
import TooManyRequests from '../errors/TooManyRequests.js';

const limiter = rateLimit({
  max: 90,
  windowMS: 3 * 60 * 1000, // 3 minutes
  handler: (req, res, next) => next(new TooManyRequests()),
});

export default limiter;
