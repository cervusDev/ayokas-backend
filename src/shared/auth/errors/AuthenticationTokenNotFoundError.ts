import { BaseError } from "@infra/error/BaseError";
import { EHttpCode } from "shared/enums";

export class AuthenticationTokenNotFoundError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'Token de autenticação não encontrado',
      EHttpCode.UNAUTHORIZED,
      'AuthenticationTokenNotFoundError',
      context,
    );
  }
}
