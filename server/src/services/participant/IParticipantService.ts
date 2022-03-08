import IChallenge from "../../models/challenge/IChallenge";
import IParticipant from "../../models/participant/IParticipant";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IUser from "../../models/user/IUser";

interface IParticipantService {
  createParticipant(participant: ParticipantDetails): Promise<IParticipant>;
  participate(userId: IUser["id"], challengeId: IChallenge["id"]): Promise<IChallenge | null>;
}

export default IParticipantService;
