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

  async registerUser(user: NewUserDetailsDBReady): Promise<UserDetails> {
    const newUser = await this.model.create(user);

    return extractUserDetails(newUser);
  }

  async getSingle(userId: string): Promise<UserDetails | null> {
    const user = await this.model.findById(userId);

    if (!user) {
      return null;
    }

    return extractUserDetails(user);
  }

  async getSingleByEmail(email: string): Promise<UserDetails | null> {
    const user = await this.model.findOne({ email });

    if (!user) {
      return null;
    }

    return extractUserDetails(user);
  }

  async getSingleByEmailUnsafe(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ email });

    if (!user) {
      return null;
    }

    return user.toObject<IUser>();
  }
}

export default UserRepository;
