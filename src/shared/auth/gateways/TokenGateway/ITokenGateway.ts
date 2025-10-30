import type { IDecryptTokenInput } from './dtos/decrypt/IDecryptTokenInput.ts';
import type { IDecryptTokenOutput } from './dtos/decrypt/IDecryptTokenOutput.ts';

export interface ITokenGateway {
  decrypt(input: IDecryptTokenInput): Promise<IDecryptTokenOutput>;
}
