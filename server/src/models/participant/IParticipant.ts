import IProgress from "../progress/IProgress";

interface IParticipant {
  id: string;
  userId: string;
  name: string;
  progresses: IProgress[];
  challenges: string[];
}

export default IParticipant;
