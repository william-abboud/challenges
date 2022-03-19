import { inject } from "inversify";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";

import IUserController from "./IUserController";
import { NewUserDetails, UserIdentity, UserLoginDetails } from "../../models/user/UserTypes";
import Locator from "../../locator";
import IUserService from "../../services/user/IUserService";
import DuplicateUserError from "../../exceptions/DuplicateUserError";
import validateApiArgs from "../../middlwares/apiValidationMiddleware";
import HttpError from "../../exceptions/HttpError";
import InvalidPasswordError from "../../exceptions/InvalidPasswordError";
import UserDoesNotExistError from "../../exceptions/UserDoesNotExistError";
import authMiddleware from "../../middlwares/authMiddleware";
import { userIdValidator } from "../../utils/validators/userIdValidator";

@controller("/users")
class UserController implements IUserController {
  private service: IUserService;

  constructor(@inject(Locator.UserService) service: IUserService) {
    this.service = service;
  }

  @httpPost(
    "/register",
    body("email").isEmail(),
    body("password").isString().trim().isLength({ min: 6, max: 50 }),
    body("name").isString().trim().isAlpha(undefined, { ignore: " -" }),
    validateApiArgs,
  )
  async register(
    req: Request<unknown, unknown, NewUserDetails>,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password, name } = req.body;

    try {
      const newUser = await this.service.registerUser({ email, password, name });

      req.session.user = newUser;
      res.send(newUser);
    } catch (error: unknown) {
      if (error instanceof DuplicateUserError) {
        next(new HttpError(400, error.message, "DuplicateUserError"));
      } else {
        next(error);
      }
    }
  }

  @httpPost(
    "/login",
    body("email").isEmail(),
    body("password").isString().trim().isLength({ min: 6, max: 50 }),
    validateApiArgs,
  )
  async login(req: Request<unknown, UserLoginDetails>, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await this.service.logUserIn({ email, password });

      req.session.user = user;
      res.send(user);
    } catch (error: unknown) {
      if (error instanceof UserDoesNotExistError) {
        next(new HttpError(400, error.message, "UserDoesNotExistError"));
      } else if (error instanceof InvalidPasswordError) {
        next(new HttpError(400, error.message, "InvalidPasswordError"));
      } else {
        next(error);
      }
    }
  }

  @httpPost("/logout", authMiddleware)
  logout(req: Request, res: Response, next: NextFunction) {
    return new Promise<void>((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
    .then(() => {
      res.clearCookie("connect.sid");
      res.send({});
    })
    .catch(next);
  }

  @httpGet(
    "/:id",
    authMiddleware,
    param("id").isMongoId(),
    param("id").custom(userIdValidator),
    validateApiArgs,
  )
  async getSingle(req: Request<UserIdentity>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await this.service.getUser(id);

      res.send(user);
    } catch (error: unknown) {
      if (error instanceof UserDoesNotExistError) {
        next(new HttpError(400, error.message, "UserDoesNotExistError"));
      } else {
        next(error);
      }
    }
  }
}

export default UserController;
