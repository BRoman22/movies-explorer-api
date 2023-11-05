import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import BadRequest from '../errors/BadRequest.js';
import Forbidden from '../errors/Forbidden.js';
import NotFound from '../errors/NotFound.js';

const { ValidationError } = mongoose.Error;

export const getUserMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

export const createMovie = (req, res, next) => {
  const movieData = req.body;
  movieData.owner = req.user._id;

  Movie.create(movieData)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Некорректные данные при создании фильма'));
      }
      next(err);
    });
};

export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) return next(new NotFound('Фильм с указанным _id не найден'));
      if (movie.owner.valueOf() !== req.user._id) return next(new Forbidden('Нет прав доступа'));
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch(next);
};
