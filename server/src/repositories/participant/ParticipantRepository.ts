import { Model } from "mongoose";
import { injectable, inject } from "inversify";

import IParticipant from "../../models/participant/IParticipant";
import IParticipantDocument from "../../models/participant/IParticipantDocument";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IParticipantRepository from "./IParticipantRepository";
import Locator from "../../locator";
import ProgressStatus from "../../enums/ProgressStatus";
import IProgress from "../../models/progress/IProgress";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";

@injectable()
class ParticipantRepository implements IParticipantRepository {
  private model: Model<IParticipantDocument>;

  constructor(@inject(Locator.ParticipantModel) model: Model<IParticipantDocument>) {
    this.model = model;
  }

  async getPaginatedParticipants({ page, size }: IPaginationOptions): Promise<IParticipant[]> {
    const participants = await this.model.find({}).limit(size).skip(size * page);

    return participants.map((participant) => participant.toObject<IParticipant>());
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

  async getParticipantInChallenge(
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

  async addProgress(participantId: string, progress: IProgress): Promise<IParticipant | null> {
    const participant = await this.model.findOneAndUpdate({
      _id: participantId,
    }, {
      $push: {
        progresses: progress,
      }
    }, {
      new: true,
    });

    return participant ? participant.toObject<IParticipant>() : null;
  }

  async updateProgressStatus(participantId: string, challengeId: string, status: ProgressStatus): Promise<IParticipant> {
    const participantDoc = await this.model.findOneAndUpdate({
      _id: participantId,
      progresses: {
        $elemMatch: {
          challengeId,
        }
      }
    }, {
      $set: {
        "progresses.$.status": status,
      }
    }, {
      projection: {
        "progresses.$": 1,
        "userId": 1,
        "name": 1,
      }
    });
    
    if (!participantDoc) {
      throw new Error("Participant not found");
    }

    const participant = participantDoc.toObject<IParticipant>();

    return participant;
  }

  async createParticipant(participant: ParticipantDetails): Promise<IParticipant> {
    const createdParticipant = await this.model.create(participant);

    return createdParticipant.toObject<IParticipant>();
  }
}

export default ParticipantRepository;
