import { omit } from "lodash";

import IUserDocument from "./IUserDocument";
import IUser from "./IUser";
import { UserDetails, UserSafeDetails } from "./UserTypes";
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

function extractUserSafeDetails(user: IUser): UserSafeDetails;
function extractUserSafeDetails(userDoc: IUserDocument): UserSafeDetails;
function extractUserSafeDetails(user: IUser | IUserDocument): UserSafeDetails {
  if (user instanceof User) {
    const usr = user.toObject<IUser>();
    const userDetails = omit(usr, ["passwordHash", "email"]);

    return userDetails;
  }

  return omit(user as IUser, ["passwordHash", "email"]);
}

export { extractUserDetails, extractUserSafeDetails };
