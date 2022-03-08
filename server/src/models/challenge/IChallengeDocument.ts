import { Document, ObjectId } from "mongoose";

import IChallenge from "./IChallenge";

interface IChallengeDocument extends Document, Omit<IChallenge, "id" | "owner" | "participants"> {
  owner: ObjectId;
  participants: ObjectId[];
}

export default IChallengeDocument;
