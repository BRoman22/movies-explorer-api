import { Router } from 'express';
import { updateUserValidation } from '../middlewares/requestValidation.js';
import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();

userRouter.get('/me', auth, getCurrentUser);
userRouter.patch('/me', auth, updateUserValidation, updateCurrentUser);

export default userRouter;
