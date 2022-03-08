import { Request, Response } from "express";

import IPaginationParams from "../../interfaces/pagination/IPaginationParams";
import IChallenge from "../../models/challenge/IChallenge";

interface IChallengesController {
  getAll(req: Request<unknown, unknown, unknown, IPaginationParams>, res: Response): void;
  create(req: Request<unknown, unknown, IChallenge, unknown>, res: Response): void;
}

export default IChallengesController;
