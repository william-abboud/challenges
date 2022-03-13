import IHttpError from "./IHttpError";

class HttpError extends Error implements IHttpError {
  status: number;
  message: string;
  type: string;

  constructor(status: number, message: string, type: string) {
    super(message);

    this.type = type;
    this.status = status;
    this.message = message;
  }
}

export default HttpError;
