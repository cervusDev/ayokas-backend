import { BaseError } from './BaseError';
import { EHttpCode } from 'shared/enums';

export class HostNotAllowedError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super('Host not allowed', EHttpCode.BAD_GATEWAY, 'HostNotAllowedError', context);
  }
}
