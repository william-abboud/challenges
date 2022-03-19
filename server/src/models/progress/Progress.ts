import { Schema } from "mongoose";

import LogSchema from "../log/LogSchema";
import IProgressDocument from "./IProgressDocument";

const ProgressSchema = new Schema<IProgressDocument>({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
  },
  logs: [LogSchema],
});

export default ProgressSchema;
