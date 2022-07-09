import express from "express";
const usersRouter = express.Router();

// Load Middlware
import isAuthenticated from "../middleware/auth";

// Load Controllers
import { getUser } from "../controllers/users";

usersRouter.get('/', isAuthenticated, getUser);

export default usersRouter;