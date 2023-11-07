import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import statusCodes from '../errors/StatusCodes.js';
import errMessages from '../errors/ErrorMessages.js';
import NotFound from '../errors/NotFound.js';
import Forbidden from '../errors/Forbidden.js';
import BadRequest from '../errors/BadRequest.js';

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
    .then((movie) => res.status(statusCodes.Created).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(errMessages.movie.badRequestCreate));
      }
      next(err);
    });
};

export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) next(new NotFound(errMessages.movie.notFound));
      if (movie.owner.valueOf() !== req.user._id) next(new Forbidden(errMessages.movie.forbidden));
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequest(errMessages.movie.badRequestDelete));
      else next(err);
    });
};
