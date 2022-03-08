import IUser from "../../models/user/IUser";
import { NewUserDetailsDBReady, UserDetails } from "../../models/user/UserTypes";

interface IUserRepository {
  getSingle(userId: string): Promise<UserDetails | null>;
  getSingleByEmail(email: string): Promise<UserDetails | null>;
  getSingleByEmailUnsafe(email: string): Promise<IUser | null>;
  registerUser(user: NewUserDetailsDBReady): Promise<UserDetails>;
}

export default IUserRepository;
