export abstract class BaseError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string
  ) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
