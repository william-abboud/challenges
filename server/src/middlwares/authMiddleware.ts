import { Request, Response, NextFunction } from "express";
import HttpError from "../exceptions/HttpError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    next(new HttpError(401, "Not authorized", "NotAuthorizedError"));
  }
};

export default authMiddleware;
