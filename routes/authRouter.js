import { Router } from 'express';
import { createUserValidation, loginValidation } from '../middlewares/requestValidation.js';
import { createUser, login, logout } from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const authRouter = Router();

authRouter.post('/signup', createUserValidation, createUser);
authRouter.post('/signin', loginValidation, login);
authRouter.post('/signout', auth, logout);

export default authRouter;
