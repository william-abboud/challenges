import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";

import Locator from "../../locator";
import IPaginationParams from "../../interfaces/pagination/IPaginationParams";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import IChallengesController from "./IChallengesController";
import IChallenge from "../../models/challenge/IChallenge";
import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import authMiddleware from "../../middlwares/authMiddleware";
import IChallengeService from "../../services/challenge/IChallengeService";

@controller("/challenges")
class ChallengesController implements IChallengesController {
  private service: IChallengeService;

  constructor(@inject(Locator.ChallengeService) service: IChallengeService) {
    this.service = service;
  }

  @httpGet("/getAll", authMiddleware)
  getAll(req: Request<unknown, unknown, unknown, IPaginationParams>, res: Response) {
    const { page = "", size = "" } = req.query;
    const paginationOptions: IPaginationOptions =
      !isNaN(parseInt(page)) && !isNaN(parseInt(size))
        ? { page: parseInt(page, 10), size: parseInt(size, 10) }
        : {};

    return this.service
      .getPaginatedChallenges(paginationOptions)
      .then((challenges) => res.send(challenges))
      .catch((err) => res.status(500).json(err));
  }

  @httpPost("/create", authMiddleware)
  create(req: Request<unknown, unknown, IChallenge, unknown>, res: Response) {
    const { name, description, rules, startDate, endDate, awards, bets, participants, owner } =
      req.body;

    const challenge: ChallengeDetails = {
      name,
      description,
      rules,
      startDate,
      endDate,
      awards,
      bets,
      participants,
      owner,
    };

    return this.service
      .createChallenge(challenge)
      .then((newChallenge) => res.send(newChallenge))
      .catch((err) => res.status(500).json(err));
  }
}

export default ChallengesController;
