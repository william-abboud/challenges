class PermissionError extends Error {
  constructor(message = "Permission denied") {
    super(message);

    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}

export default PermissionError;
