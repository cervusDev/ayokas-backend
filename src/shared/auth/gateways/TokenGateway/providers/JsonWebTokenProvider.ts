import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';

import type { IDecryptTokenInput } from '../dtos/decrypt/IDecryptTokenInput.ts';
import type { IDecryptTokenOutput } from '../dtos/decrypt/IDecryptTokenOutput.ts';
import type { ITokenGateway } from '../ITokenGateway.ts';

interface IJwtPayload extends JwtPayload {
  id: string;
}

export class JsonWebTokenProvider implements ITokenGateway {
  public async decrypt(
    input: IDecryptTokenInput,
  ): Promise<IDecryptTokenOutput> {
    const payload = jsonwebtoken.verify(
      input.token,
      input.secret,
    ) as IJwtPayload;
    const output: IDecryptTokenOutput = {
      id: payload.id,
    };
    return output;
  }
}
