import { inject, injectable } from "inversify";

import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import IChallengeRepository from "./IChallengeRepository";
import IChallenge from "../../models/challenge/IChallenge";
import Challenge from "../../models/challenge/Challenge";
import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import IFullChallenge from "../../models/challenge/IFullChallenge";
import Locator from "../../locator";

@injectable()
class ChallengeRepository implements IChallengeRepository {
  private model: typeof Challenge;

  constructor(@inject(Locator.ChallengeModel) model: typeof Challenge) {
    this.model = model;
  }

  async addParticipants(challengeId: string, participants: string[]): Promise<IChallenge | null> {
    const challenge = await this.model.findByIdAndUpdate(challengeId, {
      $push: { participants: { $each: participants } },
    });

    if (!challenge) {
      return null;
    }

    return challenge.toObject<IChallenge>();
  }

  async getChallenge(id: string): Promise<IFullChallenge | null> {
    const challenge = await this.model.findById(id).populate("owner").populate("participants");

    if (!challenge) {
      return null;
    }

    return challenge.toObject<IFullChallenge>();
  }

  async getAllChallenges({ page = 0, size = 25 }: IPaginationOptions): Promise<IChallenge[]> {
    const docs = await this.model
      .find({})
      .skip(page * size)
      .limit(size);

    return docs.map((doc) => doc.toObject<IChallenge>());
  }

  async create(challenge: ChallengeDetails): Promise<IChallenge> {
    const createdChallenge = await this.model.create(challenge);

    return createdChallenge.toObject<IChallenge>();
  }
}

export default ChallengeRepository;
