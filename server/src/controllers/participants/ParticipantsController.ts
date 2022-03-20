import { NextFunction, Request, Response } from "express";
import { param, query } from "express-validator";
import { inject } from "inversify";
import { controller, httpPut, httpGet } from "inversify-express-utils";

import ChallengeNotFoundError from "../../exceptions/ChallengeNotFoundError";
import HttpError from "../../exceptions/HttpError";
import UserAlreadyParticipantInChallengeError from "../../exceptions/UserAlreadyParticipantInChallengeError";
import UserDoesNotExistError from "../../exceptions/UserDoesNotExistError";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import Locator from "../../locator";
import validateApiArgs from "../../middlwares/apiValidationMiddleware";
import authMiddleware from "../../middlwares/authMiddleware";
import { ChallengeIdentity } from "../../models/challenge/ChallengeTypes";
import { ParticipantIdentity } from "../../models/participant/ParticipantTypes";
import { UserDetails } from "../../models/user/UserTypes";
import IParticipantService from "../../services/participant/IParticipantService";
import IParticipantsController from "./IParticipantsController";

@controller("/participants")
class ParticipantsController implements IParticipantsController {
  private service: IParticipantService;

  constructor(@inject(Locator.ParticipantService) service: IParticipantService) {
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
      const participants = await this.service.getPaginatedParticipants(paginationOptions);

      res.send(participants);
    } catch (err: unknown) {
      next(err);
    }
  }

  @httpPut(
    "/start/:participantId/challenge/:challengeId",
    authMiddleware,
    param("participantId").isMongoId(),
    param("challengeId").isMongoId(),
    validateApiArgs
  )
  async start(req: Request<{ challengeId: ChallengeIdentity["id"], participantId: ParticipantIdentity["id"] }>, res: Response, next: NextFunction) {
    const { challengeId, participantId } = req.params;

    try {
      const challenge = await this.service.startProgress(challengeId, participantId);

      res.send(challenge);
    } catch (error) {
      next(error);
    }
  }

  @httpPut(
    "/participate/:challengeId",
    authMiddleware,
    param("challengeId").isMongoId(),
    validateApiArgs,
  )
  async participate(req: Request, res: Response, next: NextFunction) {
    const { challengeId } = req.params;
    const { id: userId } = req.session.user as UserDetails;

    try {
      const challenge = await this.service.participate(userId, challengeId);

      res.send(challenge);
    } catch (err: unknown) {
      if (err instanceof UserDoesNotExistError) {
        return next(new HttpError(404, err.message, "UserDoesNotExistError"));
      } else if (err instanceof UserAlreadyParticipantInChallengeError) {
        return next(new HttpError(409, err.message, "UserAlreadyParticipantInChallengeError"));
      } else if (err instanceof ChallengeNotFoundError) {
        return next(new HttpError(404, err.message, "ChallengeNotFoundError"));
      } else {
        next(err);
      }
    }
  }
}

export default ParticipantsController;
