import express from "express";
import asyncHandler from "express-async-handler";
import { sendError } from "../middleware/error";
import History from "../models/History";
import User from "../models/User";
import Item from "../models/Item";

const addHistory = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, items, userId } = req.body as { name: string, items: Array<{ id: string, amount: number }>, userId: string };

    if (!name || !items || !userId) {
        sendError(400, 'Please provide the name, items and userId for the shopping list', next);
    }

    const history = new History({ name, items, userId, status: 'active' });

    await history.save();

    res.status(201).json({ success: true, message: 'Shopping list has been successfully saved' });
});

const getHistory = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        sendError(400, 'User does not exist', next);
    }

    const history = await History.find({ userId });

    if (history.length === 0) {
        res.status(200).json({ success: true, history: history });
    }

    const modifiedHistory = await Promise.all(history.map(async (shoppingList) => {

        const modifiedItems = await Promise.all(shoppingList.items.map(async (item) => {

            const itemExist = await Item.findById(item.id);

            if (!itemExist) sendError(400, 'Item does not exist', next);

            return { id: itemExist!._id.toString(), name: itemExist!.name, category: itemExist!.category, image: itemExist!.image, note: itemExist!.note, amount: item.amount };

        }));
        
        return { id: shoppingList._id.toString(), name: shoppingList.name, items: modifiedItems, status: shoppingList.status, createdAt: shoppingList.createdAt };

    }));

    res.status(200).json({ success: true, history: modifiedHistory });
});

const updateHistoryStatus = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId, historyId } = req.params;
    const { status } = req.body as { status: string };

    if (status !== 'completed' && status !== 'cancelled') sendError(400, 'Status can only be completed or cancelled', next);

    const user = await User.findById(userId);

    if (!user) sendError(400, 'User does not exist', next);

    const history = await History.findById(historyId);

    if (!history) sendError(400, 'History does not exist', next);

    if (history!.userId !== userId) sendError(401, 'Not authorized to edit this history', next);

    if (history!.status !== 'active') sendError(400, 'This history is not active, you cannot change its status anymore', next);

    history!.status = status;

    await history!.save();

    res.status(200).json({ success: true, message: 'History status has been successfully updated' });
});

export { addHistory, getHistory, updateHistoryStatus };