import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import ILog from "./ILog";

interface ILogDocument extends Document, Omit<ILog, "id"> {
  id: ObjectId;
}

export default ILogDocument;
