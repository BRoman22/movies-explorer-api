import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import statusCodes from '../utils/statusCodes.js';
import responseText from '../utils/responseText.js';
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
        next(new BadRequest(responseText.error.badRequest.movieCreate));
      }
      next(err);
    });
};

export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) next(new NotFound(responseText.error.notFound.movie));
      if (movie.owner.valueOf() !== req.user._id) next(new Forbidden(responseText.error.forbidden));
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: responseText.message.movieDelete }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequest(responseText.error.badRequest.movieDelete));
      else next(err);
    });
};
