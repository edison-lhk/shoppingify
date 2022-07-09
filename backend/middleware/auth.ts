import express from "express";
import { sendError } from "./error";

interface Request extends express.Request {
    isAuthenticated: () => boolean;
}

const isAuthenticated = (req: Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }

    sendError(401, 'Not authorized to access this route', next);
};

export default isAuthenticated;