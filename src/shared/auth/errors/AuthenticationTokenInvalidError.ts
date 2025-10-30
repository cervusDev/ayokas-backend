import { BaseError } from "@infra/error/BaseError";
import { EHttpCode } from "shared/enums";

export class AuthenticationTokenInvalidError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'Token de autorização inválido',
      EHttpCode.UNAUTHORIZED,
      'AuthenticationTokenInvalidError',
      context,
    );
  }
}
