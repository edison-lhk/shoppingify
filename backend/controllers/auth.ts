/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import express from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { sendError } from "../middleware/error";
import passport from "passport";

const loginUser = asyncHandler((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password } = req.body as { email: string, password: string };
    
    passport.authenticate('local', (err, user: { id: string, username: string, email: string }, info: { message: string }) => {
        if (err) return next(err);

        if (user) {
            req.logIn(user, err => {
                if (err) return next(err);

                res.status(200).json({ success: true, message: 'Login Successful' });
            });
        } else {
            res.status(401).json({ success: false, error: info.message });
        }
    })(req, res, next);
    
});

const registerUser = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { username, email, password } = req.body as { username: string, email: string, password: string };

    if (!username || !email || !password) {
        sendError(400, 'Please provide all fields', next);
    }

    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        sendError(400, 'Please provide a valid email address', next);
    }

    if (password.length < 6) {
        sendError(400, 'Password should contain at least 6 characters', next);
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        sendError(400, 'Email has already been used', next);
    } else {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'Account has been successfully created' });
    }
});

const logoutUser = asyncHandler((req: express.Request, res: express.Response, next: express.NextFunction) => {

    req.logOut(err => {
        if (err) {
            sendError(400, 'Logout Failure', next);
        }
        res.status(200).json({ success: true, message: 'Logout Successful' }); 
    });

});

export { loginUser, registerUser, logoutUser }; 