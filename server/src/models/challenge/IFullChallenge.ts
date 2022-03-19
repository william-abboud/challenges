import IParticipant from "../participant/IParticipant";
import IChallenge from "./IChallenge";
import { UserSafeDetails } from "../user/UserTypes";

interface IFullChallenge extends Omit<IChallenge, "participants" | "owner"> {
  participants: IParticipant[];
  owner: UserSafeDetails;
}

export default IFullChallenge;
