import ProgressStatus from "../../enums/ProgressStatus";
import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import IParticipant from "../../models/participant/IParticipant";
import { ParticipantDetails } from "../../models/participant/ParticipantTypes";
import IProgress from "../../models/progress/IProgress";

interface IParticipantRepository {
  createParticipant(participant: ParticipantDetails): Promise<IParticipant>;
  getParticipant(userId: string): Promise<IParticipant | null>;
  getUserParticipantInChallenge(challengeId: string, userId: string): Promise<IParticipant | null>;
  getParticipantInChallenge(
    challengeId: string,
    userId: string,
  ): Promise<IParticipant | null>
  updateProgressStatus(participantId: string, challengeId: string, status: ProgressStatus): Promise<IParticipant>;
  addProgress(participantId: string, progress: IProgress): Promise<IParticipant | null>;
  getPaginatedParticipants(paginationOptions: IPaginationOptions): Promise<IParticipant[]>;
}

export default IParticipantRepository;
