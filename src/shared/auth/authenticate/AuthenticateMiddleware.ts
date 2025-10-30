

import { IMiddleware, IMiddlewareRequest, IMiddlewareResponse } from '@infra/interfaces/IMiddleware.js';
import { ITokenGateway } from '../gateways/TokenGateway/ITokenGateway.js';
import type { IAuthenticateAbstractFactory } from './IAuthenticateMiddlewareAbstractFactory.js';
import { AuthenticationTokenNotFoundError } from '../errors/AuthenticationTokenNotFoundError.js';
import { AuthenticationTokenTypeError } from '../errors/AuthenticationTokenTypeError.js';
import { jwtEnv } from 'shared/enviroment.js';
import { AuthenticationTokenInvalidError } from '../errors/AuthenticationTokenInvalidError.js';

interface IDecryptTokenOutput {
  id: string;
}

export class AuthenticateMiddleware implements IMiddleware {
  private readonly tokenGateway: ITokenGateway;

  constructor(factory: IAuthenticateAbstractFactory) {
    this.tokenGateway = factory.makeTokenGateway();
  }

  async execute(request: IMiddlewareRequest): Promise<IMiddlewareResponse> {
    const token = this.getToken(request.headers.authorization);
    const tokenDecrypted = await this.decryptToken(token);
    const output: IMiddlewareResponse = {
      data: {
        backofficeAdminId: tokenDecrypted.id,
      },
    };
    return output;
  }

  private getToken(authorization?: string): string {
    if (!authorization) {
      throw new AuthenticationTokenNotFoundError();
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      throw new AuthenticationTokenTypeError();
    }
    if (!token) {
      throw new AuthenticationTokenNotFoundError();
    }
    return token;
  }

  private async decryptToken(token: string): Promise<IDecryptTokenOutput> {
    try {
      const tokenDecrypted = await this.tokenGateway.decrypt({
        secret: jwtEnv.secretBackoffice,
        token: token,
      });
      const output: IDecryptTokenOutput = {
        id: tokenDecrypted.id,
      };
      return output;
    } catch {
      throw new AuthenticationTokenInvalidError();
    }
  }
}
