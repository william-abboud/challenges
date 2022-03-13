import { NextFunction, Request, Response } from "express";

import {
  NewUserDetails,
  UserDetails,
  UserIdentity,
  UserLoginDetails,
} from "../../models/user/UserTypes";

interface IUserController {
  getSingle(req: Request<UserIdentity>, res: Response<UserDetails>, next: NextFunction): void;
  register(
    req: Request<unknown, unknown, NewUserDetails>,
    res: Response<UserDetails>,
    next: NextFunction,
  ): void;
  login(
    req: Request<unknown, unknown, UserLoginDetails>,
    res: Response<UserDetails>,
    next: NextFunction,
  ): void;
}

export default IUserController;
