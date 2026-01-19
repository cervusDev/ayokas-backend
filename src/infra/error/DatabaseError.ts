import { EHttpCode } from "shared/enums";
import { BaseError } from "./BaseError";

export class DatabaseError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'Database error',
      EHttpCode.INTERNAL_SERVER_ERROR,
      'DatabaseError',
      context,
    );
  }
}
