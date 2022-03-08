import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";

const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.status).send({ error: error });
  } else {
    next();
  }
};

export default errorMiddleware;
