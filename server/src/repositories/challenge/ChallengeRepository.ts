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

  addParticipants(challengeId: string, participants: string[]): Promise<IChallenge | null> {
    return this.model
      .findByIdAndUpdate(challengeId, {
        $push: { participants: { $each: participants } },
      })
      .then((doc) => (doc ? doc.toObject<IChallenge>() : null));
  }

  getChallenge(id: string): Promise<IFullChallenge | null> {
    return this.model
      .findById(id)
      .populate("creator")
      .populate("participants")
      .then((doc) => (doc ? doc.toObject<IFullChallenge>() : null));
  }

  getAllChallenges({ page = 0, size = 25 }: IPaginationOptions): Promise<IChallenge[]> {
    return this.model
      .find({})
      .skip(page * size)
      .limit(size)
      .then((docs) => docs.map((doc) => doc.toObject<IChallenge>()));
  }

  create(challenge: ChallengeDetails): Promise<IChallenge> {
    return this.model.create(challenge).then((doc) => doc.toObject<IChallenge>());
  }
}

export default ChallengeRepository;
