import { BaseError } from "@infra/error/BaseError";
import { EHttpCode } from "shared/enums";

export class AuthenticationTokenTypeError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'Tipo do token de autenticação inválido',
      EHttpCode.UNAUTHORIZED,
      'AuthenticationTokenTypeError',
      context,
    );
  }
}
