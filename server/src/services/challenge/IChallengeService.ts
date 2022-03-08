import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import IChallenge from "../../models/challenge/IChallenge";
import IFullChallenge from "../../models/challenge/IFullChallenge";

interface IChallengeService {
  getChallenge(id: string): Promise<IFullChallenge | null>;
  getPaginatedChallenges(paginationOptions: IPaginationOptions): Promise<ChallengeDetails[]>;
  createChallenge(challenge: ChallengeDetails): Promise<IChallenge>;
  addParticipants(challengeId: string, participants: string[]): Promise<IChallenge | null>;
}

export default IChallengeService;
