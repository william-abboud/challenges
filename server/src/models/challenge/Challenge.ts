import { Schema, model } from "mongoose";

import IChallengeDocument from "./IChallengeDocument";

const ChallengeSchema = new Schema<IChallengeDocument>({
  name: {
    type: String,
    required: true,
    min: 2,
    maxlength: 250,
  },
  description: {
    type: String,
    required: false,
    maxlength: 1000,
  },
  rules: {
    type: [String],
    required: true,
    validate: {
      validator: (rules: string[]) => rules.length > 0 && rules.length <= 20,
      message: "There must be at least 1 rule and no more than 20 rules.",
    },
  },
  awards: {
    type: [String],
    required: true,
    validate: {
      validator: (awards: string[]) => awards.length > 0 && awards.length <= 10,
      message: "There must be at least 1 reward and no more than 10 awards.",
    },
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Participant",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  bets: [
    {
      type: String,
      required: false,
    },
  ],
});

ChallengeSchema.pre("validate", function (next) {
  if (this.startDate > this.endDate) {
    next(new Error("End Date must be greater than Start Date"));
  } else {
    next();
  }
});

const Challenge = model<IChallengeDocument>("Challenge", ChallengeSchema);

export default Challenge;
