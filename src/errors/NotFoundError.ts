import { BaseError } from './BaseError';
import StatusCode from 'http-status-codes';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(StatusCode.NOT_FOUND, message);
  }
}
