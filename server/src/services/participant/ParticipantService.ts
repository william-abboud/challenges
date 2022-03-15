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
import UserDoesNotExistError from "../../exceptions/UserDoesNotExistError";
import UserAlreadyParticipantInChallengeError from "../../exceptions/UserAlreadyParticipantInChallengeError";

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

  getParticipant(userId: IUser["id"]): Promise<IParticipant | null> {
    return this.repository.getParticipant(userId);
  }

  async participate(
    userId: IUser["id"],
    challengeId: IChallenge["id"],
  ): Promise<IChallenge | null> {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new UserDoesNotExistError();
    }

    const participantInChallenge = await this.repository.getUserParticipantInChallenge(
      challengeId,
      userId,
    );

    if (participantInChallenge) {
      throw new UserAlreadyParticipantInChallengeError();
    }

    const participantDetails: ParticipantDetails = {
      name: user.name,
      userId,
      progresses: [],
      challenges: [challengeId],
    };

    // TODO: Use transaction
    const participant = await this.createParticipant(participantDetails);
    const challenge = await this.challengeService.addParticipants(challengeId, [participant.id]);

    return challenge;
  }
}

export default ParticipantSevice;
