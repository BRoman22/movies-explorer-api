import { Router } from 'express';
import userRouter from './userRouter.js';
import movieRouter from './movieRouter.js';
import authRouter from './authRouter.js';
import responseText from '../utils/responseText.js';
import NotFound from '../errors/NotFound.js';

const routes = Router();

routes.use('/', authRouter);
routes.use('/users', userRouter);
routes.use('/movies', movieRouter);
routes.use('*', (req, res, next) => {
  next(new NotFound(responseText.error.notFound.path));
});

export default routes;
