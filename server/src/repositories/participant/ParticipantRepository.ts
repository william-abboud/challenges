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

  createParticipant(participant: ParticipantDetails): Promise<IParticipant> {
    return this.model
      .create(participant)
      .then((participant) => participant.toObject<IParticipant>());
  }
}

export default ParticipantRepository;
