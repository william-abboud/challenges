import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";

const errorMiddleware = (
  error: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof HttpError) {
    res.status(error.status).send({ message: error.message, type: error.type });
  } else if (error instanceof Error) {
    res.status(500).send({ message: "Something went wrong!", type: "UnknownError" });
  } else {
    next();
  }
};

export default errorMiddleware;
