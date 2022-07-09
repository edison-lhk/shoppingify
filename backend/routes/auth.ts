import express from "express";
const authRouter = express.Router();

// import controllers
import { loginUser, registerUser, logoutUser } from '../controllers/auth';

authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser);

authRouter.get('/logout', logoutUser);

export default authRouter;

