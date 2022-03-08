import { NewUserDetails, UserDetails, UserLoginDetails } from "../../models/user/UserTypes";

interface IUserService {
  registerUser(user: NewUserDetails): Promise<UserDetails>;
  logUserIn(user: UserLoginDetails): Promise<UserDetails>;
  getUser(id: string): Promise<UserDetails>;
}

export default IUserService;
