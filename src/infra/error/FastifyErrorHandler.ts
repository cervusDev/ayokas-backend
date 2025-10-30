import { IErrorHandler } from '@infra/interfaces/IErrorHandler';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { fromError } from 'zod-validation-error';
import { type FastifyError, type FastifyReply, type FastifyRequest } from 'fastify';
import { BaseError } from './BaseError';
import { EEnvironment, envConfig } from 'shared/enviroment';
import { LoggerHelper } from 'shared/logHelper';
import { EHttpCode } from 'shared/enums';

type FastifyContext = {
  reply: FastifyReply;
  request: FastifyRequest;
};

export class FastifyErrorHandler implements IErrorHandler<FastifyError, FastifyContext> {
  public async execute(err: FastifyError, context: FastifyContext): Promise<void> {
    if (hasZodFastifySchemaValidationErrors(err)) {
      const validationError = fromError(err);

      return context.reply
        .code(EHttpCode.UNPROCESSABLE_ENTITY)
        .send({ message: validationError.toString() });
    }

    if (err instanceof BaseError) {
      if (envConfig.NODE_ENV !== EEnvironment.DEVELOPMENT) {
        LoggerHelper.error({
          name: err.name,
          message: err.message,
          context: err.context,
          stack: err.stack,
        });
      }

      return context.reply.code(err.statusCode).send(this.formatErrorResponse(err));
    }
    return context.reply.code(EHttpCode.INTERNAL_SERVER_ERROR).send(this.formatErrorResponse(err));
  }

  private formatErrorResponse(err: FastifyError) {
    return {
      name: err.name,
      message: err.message || 'Internal server error',
      context: (err as BaseError)?.context,
    };
  }
}
