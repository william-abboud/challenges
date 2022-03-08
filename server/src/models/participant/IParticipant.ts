import IProgress from "../progress/IProgress";

interface IParticipant {
  id: string;
  userId: string;
  name: string;
  progresses: IProgress[];
}

export default IParticipant;
