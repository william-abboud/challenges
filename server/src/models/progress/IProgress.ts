import ILog from "../logs/ILog";
import { ProgressStatus } from "./Progress.enums";

interface IProgress {
  challengeId: string;
  status: ProgressStatus;
  logs: ILog[];
}

export default IProgress;
