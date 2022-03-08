import { Request, Response } from "express";

interface IParticipantsController {
  participate(req: Request, res: Response): void;
}

export default IParticipantsController;
