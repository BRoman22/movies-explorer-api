import { Router } from 'express';
import { createUserValidation, loginValidation } from '../middlewares/requestValidation.js';
import { createUser, login, logout } from '../controllers/users.js';
import userRouter from './userRouter.js';
import movieRouter from './movieRouter.js';
import auth from '../middlewares/auth.js';
import errMessages from '../errors/ErrorMessages.js';
import NotFound from '../errors/NotFound.js';

const routes = Router();

routes.post('/signup', createUserValidation, createUser);
routes.post('/signin', loginValidation, login);
routes.use(auth);
routes.use('/users', userRouter);
routes.use('/movies', movieRouter);
routes.post('/signout', logout);
routes.use('*', (req, res, next) => {
  next(new NotFound(errMessages.auth.notFound));
});

export default routes;
