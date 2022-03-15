import IParticipant from "../../models/participant/IParticipant";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";

interface IParticipantRepository {
  createParticipant(participant: ParticipantDetails): Promise<IParticipant>;
  getParticipant(userId: string): Promise<IParticipant | null>;
  getUserParticipantInChallenge(challengeId: string, userId: string): Promise<IParticipant | null>;
}

export default IParticipantRepository;
