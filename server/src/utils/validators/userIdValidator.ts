import { CustomValidator } from "express-validator";

import PermissionError from "../../exceptions/PermissionError";

const userIdValidator: CustomValidator = (value, { req }) => {
  if (req.session.user && req.session.user.id === value) {
    return true;
  }

  throw new PermissionError();
};

export { userIdValidator };
