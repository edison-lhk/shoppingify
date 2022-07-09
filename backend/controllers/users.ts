import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";

declare global {
    namespace Express {
      interface User {
        id: string,
        username: string,
        email: string
      }
    }
}

const getUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const id = req.user!.id;

    const user = await User.findById(id);

    res.status(200).json({ success: true, user: { id: user!._id, username: user!.username, email: user!.email, items: user!.items } });
});

export { getUser };