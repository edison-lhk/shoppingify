import express from "express";
const itemsRouter = express.Router();

// Load Middleware
import isAuthenticated from "../middleware/auth";

// Load Controllers
import { getItems, addItem, updateItem } from "../controllers/items";

itemsRouter.route('/:userId').all(isAuthenticated).get(getItems).post(addItem);

itemsRouter.route('/:userId/:itemId').all(isAuthenticated).put(updateItem);

export default itemsRouter;