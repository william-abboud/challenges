import { Schema, model } from "mongoose";
import isAlpha from "validator/lib/isAlpha";

import ProgressSchema from "../progress/Progress";
import IParticipantDocument from "./IParticipantDocument";

const ParticipantSchema = new Schema<IParticipantDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: (name: string) => isAlpha(name, "en-US", { ignore: " -" }),
    },
  },
  progresses: [ProgressSchema],
});

const Participant = model<IParticipantDocument>("Participant", ParticipantSchema);

export default Participant;
