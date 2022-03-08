import { inject, injectable } from "inversify";

import IChallengeRepository from "../../repositories/challenge/IChallengeRepository";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import Locator from "../../locator";

import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import IChallenge from "../../models/challenge/IChallenge";
import IFullChallenge from "../../models/challenge/IFullChallenge";
import IChallengeService from "./IChallengeService";

@injectable()
class ChallengeService implements IChallengeService {
  private repository: IChallengeRepository;

  constructor(@inject(Locator.ChallengeRepository) repository: IChallengeRepository) {
    this.repository = repository;
  }

  addParticipants(challengeId: string, participants: string[]): Promise<IChallenge | null> {
    return this.repository.addParticipants(challengeId, participants);
  }

  getChallenge(id: string): Promise<IFullChallenge | null> {
    return this.repository.getChallenge(id);
  }

  getPaginatedChallenges(paginationOptions: IPaginationOptions): Promise<ChallengeDetails[]> {
    return this.repository.getAllChallenges(paginationOptions);
  }

  createChallenge(challenge: ChallengeDetails): Promise<IChallenge> {
    return this.repository.create(challenge);
  }
}

export default ChallengeService;
