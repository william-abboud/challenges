class UserDoesNotExistError extends Error {
  constructor(message = "User does not exist") {
    super(message);

    Object.setPrototypeOf(this, UserDoesNotExistError.prototype);
  }
}

export default UserDoesNotExistError;
