import { Schema } from "mongoose";

import LogSchema from "../logs/Log";
import IProgressDocument from "./IProgressDocument";

const ProgressSchema = new Schema<IProgressDocument>({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  logs: [LogSchema],
});

export default ProgressSchema;
