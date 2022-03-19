import { NextFunction, Request, Response } from "express";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";

import IChallenge from "../../models/challenge/IChallenge";
import { ChallengeIdentity } from "../../models/challenge/ChallengeTypes";

interface IChallengesController {
  getAll(
    req: Request<unknown, unknown, unknown, IPaginationOptions>,
    res: Response,
    next: NextFunction,
  ): void;
  create(
    req: Request<unknown, unknown, IChallenge, unknown>,
    res: Response,
    next: NextFunction,
  ): void;
  get(
    req: Request<ChallengeIdentity>,
    res: Response,
    next: NextFunction,
  ): void;
}

export default IChallengesController;
