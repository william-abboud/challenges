import IParticipant from "../../models/participant/IParticipant";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";

interface IParticipantRepository {
  createParticipant(participant: ParticipantDetails): Promise<IParticipant>;
}

export default IParticipantRepository;
