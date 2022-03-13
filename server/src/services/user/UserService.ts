import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

import IUserRepository from "../../repositories/user/IUserRepository";
import Locator from "../../locator";
import { NewUserDetails, UserDetails, UserLoginDetails } from "../../models/user/UserTypes";
import IUserService from "./IUserService";
import { extractUserDetails } from "../../models/user/userUtils";
import DuplicateUserError from "../../exceptions/DuplicateUserError";
import UserDoesNotExistError from "../../exceptions/UserDoesNotExistError";
import InvalidPasswordError from "../../exceptions/InvalidPasswordError";

@injectable()
class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(@inject(Locator.UserRepository) userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  async registerUser({ email, password, name }: NewUserDetails): Promise<UserDetails> {
    const existingUser = await this.repository.getSingleByEmail(email);

    if (existingUser) {
      throw new DuplicateUserError();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      name,
      email,
      passwordHash,
    };

    return this.repository.registerUser(user);
  }

  async logUserIn({ email, password }: UserLoginDetails): Promise<UserDetails> {
    const user = await this.repository.getSingleByEmailUnsafe(email);

    if (!user) {
      throw new UserDoesNotExistError();
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new InvalidPasswordError();
    }

    return extractUserDetails(user);
  }

  async getUser(id: string): Promise<UserDetails> {
    const user = await this.repository.getSingle(id);

    if (!user) {
      throw new UserDoesNotExistError();
    }

    return user;
  }
}

export default UserService;
