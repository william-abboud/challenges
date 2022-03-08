import IParticipant from "../participant/IParticipant";
import IChallenge from "./IChallenge";

interface IFullChallenge extends Omit<IChallenge, "participants" | "owner"> {
  participants: IParticipant[];
  owner: IParticipant;
}

export default IFullChallenge;
