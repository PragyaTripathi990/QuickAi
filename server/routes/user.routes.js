import express from 'express';
import { getCurrentUser, updateUser, askToAssistant } from '../controllers/user.contoller.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router()
userRouter.post('/current', isAuth, getCurrentUser);
userRouter.post('/update', isAuth, updateUser);
userRouter.post('/asktoassistant', isAuth, askToAssistant);
export default userRouter;
