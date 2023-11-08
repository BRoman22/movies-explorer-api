import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';
import responseText from '../utils/responseText.js';
import { secretKey } from '../utils/config.js';

export default function auth(req, res, next) {
  const { cookies } = req;

  if (!cookies && !cookies.jwtKey) {
    return next(new Unauthorized(responseText.error.unauthorized.needAuth));
  }
  const token = cookies.jwtKey;

  return jwt.verify(token, secretKey, (err, payload) => {
    if (err) next(new Unauthorized(responseText.error.unauthorized.needAuth));
    else {
      req.user = { _id: payload._id };
      next();
    }
  });
}
