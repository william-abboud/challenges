import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";

import IUserRepository from "../../repositories/user/IUserRepository";
import Locator from "../../locator";
import { NewUserDetails, UserDetails, UserLoginDetails } from "../../models/user/UserTypes";
import IUserService from "./IUserService";
import { extractUserDetails } from "../../models/user/userUtils";

@injectable()
class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(@inject(Locator.UserRepository) userRepository: IUserRepository) {
    this.repository = userRepository;
  }

  registerUser({ email, password, name }: NewUserDetails): Promise<UserDetails> {
    return this.repository.getSingleByEmail(email).then((existingUser) => {
      if (existingUser) {
        return Promise.reject(new Error("User already exists"));
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((passwordHash) => {
            const user = {
              name,
              email,
              passwordHash,
            };

            return this.repository.registerUser(user);
          });
      }
    });
  }

  logUserIn({ email, password }: UserLoginDetails): Promise<UserDetails> {
    return this.repository.getSingleByEmailUnsafe(email).then((user) => {
      if (!user) {
        return Promise.reject(new Error("User does not exist"));
      } else {
        return bcrypt.compare(password, user.passwordHash).then((isValid) => {
          if (isValid) {
            return extractUserDetails(user);
          } else {
            return Promise.reject("Invalid password");
          }
        });
      }
    });
  }

  getUser(id: string): Promise<UserDetails> {
    return this.repository.getSingle(id).then((user) => {
      if (!user) {
        return Promise.reject(new Error("User does not exist"));
      } else {
        return user;
      }
    });
  }
}

export default UserService;
