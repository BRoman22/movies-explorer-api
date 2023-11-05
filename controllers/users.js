import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Conflict from '../errors/Conflict.js';
import BadRequest from '../errors/BadRequest.js';

const { ValidationError } = mongoose.Error;
const { NODE_ENV, JWT_SECRET } = process.env;

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

export const updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwtKey', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 3600000 * 24 * 7,
      });
      return res.send({ message: 'Вы вошли в свой аккаунт' });
    })
    .catch(next);
};

export const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequest('Некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new Conflict('Такой пользователь уже существует'));
      }
      return next(err);
    });
};

export const logout = (req, res) => {
  res.clearCookie('jwtKey');
  return res.send({ message: 'Вы вышли из своего аккаунта' });
};
