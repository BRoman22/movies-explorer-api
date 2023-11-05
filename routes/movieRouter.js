import { Router } from 'express';
import { createMovieValidation, checkMovieId } from '../middlewares/requestValidation.js';
import { getUserMovie, createMovie, deleteMovie } from '../controllers/movies.js';

const movieRouter = Router();

movieRouter.get('/', getUserMovie);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:movieId', checkMovieId, deleteMovie);

export default movieRouter;
