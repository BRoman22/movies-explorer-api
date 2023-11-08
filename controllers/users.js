import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import statusCodes from '../utils/statusCodes.js';
import responseText from '../utils/responseText.js';
import NotFound from '../errors/NotFound.js';
import BadRequest from '../errors/BadRequest.js';
import Conflict from '../errors/Conflict.js';
import { secretKey } from '../utils/config.js';
import { jwtCookieConfig, salt } from '../utils/constants.js';

const { ValidationError } = mongoose.Error;

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, salt)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const noPasswordUser = user.toObject();
      delete noPasswordUser.password;
      res.status(statusCodes.Created).send(noPasswordUser);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequest(responseText.error.badRequest.userCreate));
      }
      if (err.code === statusCodes.DuplicateMongo) {
        return next(new Conflict(responseText.error.conflict));
      }
      return next(err);
    });
};

export const updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFound(responseText.error.notFound.user));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest(responseText.error.badRequest.userUpdate));
      } else if (err.code === statusCodes.DuplicateMongo) {
        next(new Conflict(responseText.error.conflict));
      } else {
        next(err);
      }
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      res.cookie('jwtKey', token, jwtCookieConfig);
      return res.send({ message: responseText.message.userLogin });
    })
    .catch(next);
};

export const logout = (req, res) => {
  res.clearCookie('jwtKey');
  return res.send({ message: responseText.message.userLogout });
};
