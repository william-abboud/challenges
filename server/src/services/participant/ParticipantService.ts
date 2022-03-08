import { inject, injectable } from "inversify";

import Locator from "../../locator";
import IChallenge from "../../models/challenge/IChallenge";
import IParticipant from "../../models/participant/IParticipant";
import IUser from "../../models/user/IUser";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IParticipantRepository from "../../repositories/participant/IParticipantRepository";
import IParticipantService from "./IParticipantService";
import IChallengeService from "../challenge/IChallengeService";
import IUserService from "../user/IUserService";

@injectable()
class ParticipantSevice implements IParticipantService {
  private repository: IParticipantRepository;
  private challengeService: IChallengeService;
  private userService: IUserService;

  constructor(
    @inject(Locator.ParticipantRepository) repository: IParticipantRepository,
    @inject(Locator.ChallengeService) challengeService: IChallengeService,
    @inject(Locator.UserService) userService: IUserService,
  ) {
    this.repository = repository;
    this.challengeService = challengeService;
    this.userService = userService;
  }

  createParticipant(participant: ParticipantDetails): Promise<IParticipant> {
    return this.repository.createParticipant(participant);
  }

  participate(userId: IUser["id"], challengeId: IChallenge["id"]): Promise<IChallenge | null> {
    return this.userService
      .getUser(userId)
      .then((user) => {
        const { name } = user;

        const participantDetails: ParticipantDetails = {
          name,
          userId,
          progresses: [],
        };

        return this.createParticipant(participantDetails);
      })
      .then((participant) => {
        return this.challengeService.addParticipants(challengeId, [participant.id]);
      })
      .then((challenge) => challenge);
  }
}

export default ParticipantSevice;
