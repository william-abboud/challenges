import { injectable, inject } from "inversify";
import { Model } from "mongoose";

import Locator from "../../locator";
import IUser from "../../models/user/IUser";
import { NewUserDetailsDBReady, UserDetails } from "../../models/user/UserTypes";
import { extractUserDetails } from "../../models/user/userUtils";
import IUserRepository from "./IUserRepository";

@injectable()
class UserRepository implements IUserRepository {
  private model: Model<IUser>;

  constructor(@inject(Locator.UserModel) model: Model<IUser>) {
    this.model = model;
  }

  registerUser(user: NewUserDetailsDBReady): Promise<UserDetails> {
    return this.model.create(user).then(extractUserDetails);
  }

  getSingle(userId: string): Promise<UserDetails | null> {
    return this.model.findById(userId).then((usr) => {
      if (!usr) {
        return null;
      }

      return extractUserDetails(usr);
    });
  }

  getSingleByEmail(email: string): Promise<UserDetails | null> {
    return this.model.findOne({ email }).then((usr) => {
      if (!usr) {
        return null;
      }

      return extractUserDetails(usr);
    });
  }

  getSingleByEmailUnsafe(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).then((usr) => {
      if (!usr) {
        return null;
      }

      return usr.toObject<IUser>();
    });
  }
}

export default UserRepository;
