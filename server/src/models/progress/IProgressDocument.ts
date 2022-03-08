import { ObjectId } from "mongoose";

import IProgress from "./IProgress";

interface IProgressDocument extends Document, Omit<IProgress, "id" | "challengeId"> {
  challengeId: ObjectId;
}

export default IProgressDocument;
