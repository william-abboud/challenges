import { NextFunction, Request, Response } from "express";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";

interface IParticipantsController {
  participate(req: Request, res: Response, next: NextFunction): void;
  start(req: Request, res: Response, next: NextFunction): void;
  getAll(req: Request<unknown, unknown, unknown, IPaginationOptions>, res: Response, next: NextFunction): void;
}

export default IParticipantsController;
