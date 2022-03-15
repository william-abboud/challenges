import { NextFunction, Request, Response } from "express";
import { param } from "express-validator";
import { inject } from "inversify";
import { controller, httpPut } from "inversify-express-utils";
import HttpError from "../../exceptions/HttpError";
import UserAlreadyParticipantInChallengeError from "../../exceptions/UserAlreadyParticipantInChallengeError";
import UserDoesNotExistError from "../../exceptions/UserDoesNotExistError";

import Locator from "../../locator";
import validateApiArgs from "../../middlwares/apiValidationMiddleware";
import authMiddleware from "../../middlwares/authMiddleware";
import { UserDetails } from "../../models/user/UserTypes";
import IParticipantService from "../../services/participant/IParticipantService";
import IParticipantsController from "./IParticipantsController";

@controller("/participants")
class ParticipantsController implements IParticipantsController {
  private service: IParticipantService;

  constructor(@inject(Locator.ParticipantService) service: IParticipantService) {
    this.service = service;
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
      } else {
        next(err);
      }
    }
  }
}

export default ParticipantsController;
