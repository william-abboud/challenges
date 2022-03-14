import { inject } from "inversify";
import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { body, query } from "express-validator";

import Locator from "../../locator";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import IChallengesController from "./IChallengesController";
import IChallenge from "../../models/challenge/IChallenge";
import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import authMiddleware from "../../middlwares/authMiddleware";
import IChallengeService from "../../services/challenge/IChallengeService";
import validateApiArgs from "../../middlwares/apiValidationMiddleware";

@controller("/challenges")
class ChallengesController implements IChallengesController {
  private service: IChallengeService;

  constructor(@inject(Locator.ChallengeService) service: IChallengeService) {
    this.service = service;
  }

  @httpGet(
    "/getAll",
    query("page")
      .customSanitizer((v) => v || 0)
      .isNumeric()
      .toInt(10),
    query("size")
      .customSanitizer((v) => v || 25)
      .isNumeric()
      .toInt(10)
      .default(25),
    validateApiArgs,
  )
  async getAll(
    req: Request<unknown, unknown, unknown, IPaginationOptions>,
    res: Response,
    next: NextFunction,
  ) {
    const { page, size } = req.query;

    const paginationOptions = {
      page,
      size,
    };

    try {
      const challenges = await this.service.getPaginatedChallenges(paginationOptions);

      res.send(challenges);
    } catch (err: unknown) {
      next(err);
    }
  }

  @httpPost(
    "/create",
    authMiddleware,
    body("name").notEmpty().isString().trim().isLength({ min: 2, max: 250 }),
    body("description").notEmpty().isString().trim().isLength({ min: 2, max: 1000 }),
    body("rules").notEmpty().isArray({ min: 1, max: 25 }),
    body("startDate").notEmpty().isString(),
    body("endDate").notEmpty().isString(),
    body("awards").notEmpty().isArray({ min: 1, max: 20 }),
    body("bets").isArray().optional(),
    body("participants").isArray().optional(),
    body("owner").isMongoId().optional(),
    validateApiArgs,
  )
  async create(
    req: Request<unknown, unknown, IChallenge, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    const {
      name,
      description,
      rules,
      startDate,
      endDate,
      awards,
      bets,
      participants = [],
      owner = req.session.user?.id,
    } = req.body;

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

    try {
      const createdChallenge = await this.service.createChallenge(challenge);

      res.send(createdChallenge);
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default ChallengesController;
