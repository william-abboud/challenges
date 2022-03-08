import { inject } from "inversify";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";

import IUserController from "./IUserController";
import { NewUserDetails, UserIdentity, UserLoginDetails } from "../../models/user/UserTypes";
import Locator from "../../locator";
import IUserService from "../../services/user/IUserService";

@controller("/users")
class UserController implements IUserController {
  private service: IUserService;

  constructor(@inject(Locator.UserService) service: IUserService) {
    this.service = service;
  }

  @httpPost("/register")
  register(req: Request<unknown, NewUserDetails>, res: Response) {
    const { email, password, name } = req.body;

    return this.service
      .registerUser({ email, password, name })
      .then((newUser) => {
        req.session.user = newUser;

        res.send(newUser);
      })
      .catch((error) => {
        if (error.message.includes("User already exists")) {
          res.status(400).send({ message: "User already exists" });
        } else {
          res.status(500).send(error);
        }
      });
  }

  @httpPost("/login")
  login(req: Request<unknown, UserLoginDetails>, res: Response) {
    const { email, password } = req.body;

    return this.service
      .logUserIn({ email, password })
      .then((user) => {
        req.session.user = user;

        res.send(user);
      })
      .catch((error) => {
        if (
          error.message.includes("User does not exist") ||
          error.message.includes("Invalid password")
        ) {
          res.status(400).send(error);
        } else {
          res.status(500).send(error);
        }
      });
  }

  @httpGet("/:id")
  getSingle(req: Request<UserIdentity>, res: Response) {
    const { id } = req.params;

    return this.service
      .getUser(id)
      .then((user) => res.send(user))
      .catch((error) => {
        if (error.message.includes("User does not exist")) {
          res.status(400).send(error);
        } else {
          res.status(500).send(error);
        }
      });
  }
}

export default UserController;
