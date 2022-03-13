class InvalidPasswordError extends Error {
  constructor(message = "Invalid password") {
    super(message);

    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}

export default InvalidPasswordError;
