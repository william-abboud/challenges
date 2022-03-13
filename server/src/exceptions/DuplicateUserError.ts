class DuplicateUserError extends Error {
  constructor(message = "User already exists") {
    super(message);

    Object.setPrototypeOf(this, DuplicateUserError.prototype);
  }
}

export default DuplicateUserError;
