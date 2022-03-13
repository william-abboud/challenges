import { omit } from "lodash";

import IUserDocument from "./IUserDocument";
import IUser from "./IUser";
import { UserDetails } from "./UserTypes";
import User from "./User";

function extractUserDetails(user: IUser): UserDetails;
function extractUserDetails(userDoc: IUserDocument): UserDetails;
function extractUserDetails(user: IUser | IUserDocument): UserDetails {
  if (user instanceof User) {
    const usr = user.toObject<IUser>();
    const userDetails = omit(usr, ["passwordHash"]);

    return userDetails;
  }

  return omit(user as IUser, ["passwordHash"]);
}

export { extractUserDetails };
