import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import IChallenge from "../../models/challenge/IChallenge";
import IParticipant from "../../models/participant/IParticipant";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IProgress from "../../models/progress/IProgress";
import IUser from "../../models/user/IUser";

interface IParticipantService {
  createParticipant(participant: ParticipantDetails): Promise<IParticipant>;
  participate(userId: IUser["id"], challengeId: IChallenge["id"]): Promise<IChallenge | null>;
  getParticipant(userId: IUser["id"]): Promise<IParticipant | null>;
  getPaginatedParticipants(paginationOptions: IPaginationOptions): Promise<IParticipant[]>;
  startProgress(challengeId: string, participantId: string): Promise<IParticipant>;
  addProgress(participantId: string, progress: IProgress): Promise<IParticipant | null>;
}

export default IParticipantService;
