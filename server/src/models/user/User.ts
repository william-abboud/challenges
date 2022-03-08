import { Schema, model } from "mongoose";
import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";

import IUser from "./IUser";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: (name: string) => isAlpha(name, "en-US", { ignore: " -" }),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
