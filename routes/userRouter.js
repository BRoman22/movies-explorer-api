import { Router } from 'express';
import { updateUserValidation } from '../middlewares/requestValidation.js';
import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidation, updateCurrentUser);

export default userRouter;
