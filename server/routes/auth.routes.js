import express from 'express';
import { register, login, logout,  } from '../controllers/auth.controller.js';
const authRouter = express.Router();
authRouter.post('/signup', register);
authRouter.post('/signin', login);
authRouter.post('/logout', logout);
export default authRouter;
