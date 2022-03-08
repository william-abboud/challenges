import { Request, Response } from "express";

import {
  NewUserDetails,
  UserDetails,
  UserIdentity,
  UserLoginDetails,
} from "../../models/user/UserTypes";

interface IUserController {
  getSingle(req: Request<UserIdentity>, res: Response<UserDetails>): void;
  register(req: Request<unknown, NewUserDetails>, res: Response<UserDetails>): void;
  login(req: Request<unknown, UserLoginDetails>, res: Response<UserDetails>): void;
}

export default IUserController;
