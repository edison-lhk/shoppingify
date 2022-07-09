import express from "express";
import asyncHandler from "express-async-handler";
import Item from "../models/Item";
import User from "../models/User";
import { sendError } from "../middleware/error";
import mongoose from "mongoose";

const getItems = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.params;

    const items: Array<{ id: string, name: string, category: string, image: string | undefined, note: string | undefined }> = [];

    const defaultItems = await Item.find({ default: true });

    items.push(...defaultItems.map(item => ({ id: item._id.toString(), name: item.name, category: item.category, image: item.image, note: item.note })));

    const user = await User.findById(userId);

    if (!user) {
        sendError(400, 'User does not exist', next);
    }

    if (user!.items && user!.items.length > 0) {

        for (const itemId of user!.items) {
            const item = await Item.findById(itemId);

            items.push({ id: item!._id.toString(), name: item!.name, category: item!.category, image: item!.image, note: item!.note });
        }
        
    }

    res.status(200).json({ success: true, items: items });
});

const addItem = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.params;
    const { name, category, image, note } = req.body as { name: string, category: string, image?: string, note?: string };

    const user = await User.findById(userId);

    if (!user) {
        sendError(400, 'User does not exist', next);
    }

    const itemExist = await Item.findOne({ name });

    if (itemExist) {
        sendError(400, 'Item has already existed', next);
    }

    const newItem = new Item({ name, category, image, note, default: false });
    await newItem.save();

    await User.findByIdAndUpdate(userId, { $push: { "items": newItem._id.toString() } }, { safe: true, upsert: true, new: true });

    res.status(200).json({ success: true, item: { id: newItem._id.toString(), name: newItem.name, category: newItem.category, image: newItem.image, note: newItem.note }, message: `${name} has been successfully added` });
});

const updateItem = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId, itemId } = req.params as { userId: string, itemId: string };
    const { name, category, image, note } = req.body as { name: string, category: string, image?: string, note?: string };

    const user = await User.findById(userId);

    if (!user) {
        sendError(400, 'User does not exist', next);
    }

    let itemIdBelongToUser = false;

    if (user!.items) {

        user?.items.forEach(userItemId => {
            if (userItemId === itemId) {
                itemIdBelongToUser = true;
            }
        });
        
    }

    if (!itemIdBelongToUser) {
        sendError(400, 'Item does not belong to user', next);
    }

    const item = await Item.findById(itemId);

    if (!item) {
        sendError(400, 'Item does not exist', next);
    }

    item!.name = name;
    item!.category = category;
    item!.image = image ? image : undefined;
    item!.note = note ? note : undefined;

    await item!.save();

    res.status(200).json({ success: true, item: { id: item!._id.toString(), name: item!.name, category: item!.category, image: item!.image, note: item!.note }, message: 'Item has been updated sucessfully' });
});

export { getItems, addItem, updateItem };