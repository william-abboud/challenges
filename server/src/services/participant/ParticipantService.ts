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
import ProgressStatus from "../../enums/ProgressStatus";
import IProgress from "../../models/progress/IProgress";
import ChallengeNotFoundError from '../../exceptions/ChallengeNotFoundError';
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";

@injectable()
class ParticipantService implements IParticipantService {
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
  getPaginatedParticipants(paginationOptions: IPaginationOptions): Promise<IParticipant[]> {
    return this.repository.getPaginatedParticipants(paginationOptions);
  }

  createParticipant(participant: ParticipantDetails): Promise<IParticipant> {
    return this.repository.createParticipant(participant);
  }

  getParticipant(userId: IUser["id"]): Promise<IParticipant | null> {
    return this.repository.getParticipant(userId);
  }

  addProgress(participantId: string, progress: IProgress): Promise<IParticipant | null> {
    return this.repository.addProgress(participantId, progress);
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

    const existingParticipant = await this.repository.getParticipant(userId);

    const progress: IProgress = {
      challengeId,
      status: ProgressStatus.NOT_STARTED,
      logs: [],
    };
    
    const existingChallenge = await this.challengeService.getChallenge(challengeId);
    
    if (!existingChallenge) {
      throw new ChallengeNotFoundError(challengeId);
    }
    
    if (!existingParticipant) {
      const participantDetails: ParticipantDetails = {
        userId,
        name: user.name,
        progresses: [progress],
      };

      // TODO: Use transaction
      const participant = await this.createParticipant(participantDetails);
      const challenge = await this.challengeService.addParticipants(challengeId, [participant.id]);

      return challenge;
    } else {
      await this.addProgress(existingParticipant.id, progress);
      const challenge = await this.challengeService.addParticipants(challengeId, [existingParticipant.id]);
      
      return challenge;
    }
  }

  async startProgress(challengeId: string, participantId: string): Promise<IParticipant> {
    return this.repository.updateProgressStatus(participantId, challengeId, ProgressStatus.IN_PROGRESS);
  }
}

export default ParticipantService;
