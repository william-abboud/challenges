import IPaginationOptions from "../../interfaces/pagination/IPaginationOptions";
import { ChallengeDetails } from "../../models/challenge/ChallengeTypes";
import IChallenge from "../../models/challenge/IChallenge";
import IFullChallenge from "../../models/challenge/IFullChallenge";

interface IChallengeRepository {
  getAllChallenges(paginationOptions: IPaginationOptions): Promise<IChallenge[]>;
  create(challenge: ChallengeDetails): Promise<IChallenge>;
  getChallenge(id: string): Promise<IFullChallenge | null>;
  addParticipants(challengeId: string, participants: string[]): Promise<IChallenge>;
}

export default IChallengeRepository;
