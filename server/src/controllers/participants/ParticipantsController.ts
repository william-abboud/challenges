import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPut } from "inversify-express-utils";

import Locator from "../../locator";
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

  @httpPut("/participate/:challengeId", authMiddleware)
  participate(req: Request, res: Response) {
    const { challengeId } = req.params;
    const { id: userId } = req.session.user as UserDetails;

    return this.service
      .participate(userId, challengeId)
      .then((challenge) => res.json(challenge))
      .catch((err) => res.status(500).json(err));
  }
}

export default ParticipantsController;
