import express from "express";
const historyRouter = express.Router();

// Import Middleware
import isAuthenticated from "../middleware/auth";

// Import Controllers
import { addHistory, getHistory, updateHistoryStatus } from "../controllers/history";

historyRouter.post('/', isAuthenticated, addHistory);

historyRouter.get('/:userId', isAuthenticated, getHistory);

historyRouter.patch('/updateStatus/:userId/:historyId', isAuthenticated, updateHistoryStatus);

export default historyRouter;