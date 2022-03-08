import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default authMiddleware;
