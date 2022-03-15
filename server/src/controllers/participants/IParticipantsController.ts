import { NextFunction, Request, Response } from "express";

interface IParticipantsController {
  participate(req: Request, res: Response, next: NextFunction): void;
}

export default IParticipantsController;
