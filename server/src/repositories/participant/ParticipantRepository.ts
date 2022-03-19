import { Model } from "mongoose";
import { injectable, inject } from "inversify";

import IParticipant from "../../models/participant/IParticipant";
import IParticipantDocument from "../../models/participant/IParticipantDocument";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IParticipantRepository from "./IParticipantRepository";
import Locator from "../../locator";

@injectable()
class ParticipantRepository implements IParticipantRepository {
  private model: Model<IParticipantDocument>;

  constructor(@inject(Locator.ParticipantModel) model: Model<IParticipantDocument>) {
    this.model = model;
  }

  async getParticipant(userId: string): Promise<IParticipant | null> {
    const participant = await this.model.findOne({ userId });

    return participant ? participant.toObject<IParticipant>() : null;
  }

  async getUserParticipantInChallenge(
    challengeId: string,
    userId: string,
  ): Promise<IParticipant | null> {
    const participant = await this.model.findOne({
      userId,
      progresses: {
        $elemMatch: {
          challengeId,
        },
      }
    });

    return participant ? participant.toObject<IParticipant>() : null;
  }

  async createParticipant(participant: ParticipantDetails): Promise<IParticipant> {
    const createdParticipant = await this.model.create(participant);

    return createdParticipant.toObject<IParticipant>();
  }
}

export default ParticipantRepository;
