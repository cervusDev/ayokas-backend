import { ITokenGateway } from "../gateways/TokenGateway/ITokenGateway";

export interface IAuthenticateAbstractFactory {
  makeTokenGateway(): ITokenGateway;
}
