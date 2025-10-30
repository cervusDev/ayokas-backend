import { BaseError } from "./BaseError";
import { EHttpCode } from "shared/enums";

export class RateLimitError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super('Request limit reached', EHttpCode.TOO_MANY_REQUESTS, 'RateLimitError', context);
  }
}
