import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import IParticipant from "./IParticipant";

interface IParticipantDocument
  extends Document,
    Omit<IParticipant, "id" | "userId" | "challenges"> {
  userId: ObjectId;
}

export default IParticipantDocument;
