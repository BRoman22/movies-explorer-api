import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export default function auth(req, res, next) {
  const { cookies } = req;

  if (!cookies && !cookies.jwtKey) throw new Unauthorized('Необходима авторизация');

  const token = cookies.jwtKey;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';

  return jwt.verify(token, secret, (err, payload) => {
    if (err) next(new Unauthorized('Необходима авторизация'));
    req.user = { _id: payload._id };
    next();
  });
}
