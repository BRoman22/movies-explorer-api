import { Router } from 'express';
import { createMovieValidation, checkMovieId } from '../middlewares/requestValidation.js';
import { getUserMovie, createMovie, deleteMovie } from '../controllers/movies.js';
import auth from '../middlewares/auth.js';

const movieRouter = Router();

movieRouter.get('/', auth, getUserMovie);
movieRouter.post('/', auth, createMovieValidation, createMovie);
movieRouter.delete('/:movieId', auth, checkMovieId, deleteMovie);

export default movieRouter;
