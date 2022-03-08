import IHttpError from "./IHttpError";

class HttpError extends Error implements IHttpError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

export default HttpError;
