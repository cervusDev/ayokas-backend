import { CreateClientUseCase } from "application/usecases/client/create";

export interface ICreateClientControllerAbstractFactory {
  makeCreateClientUseCase(): CreateClientUseCase;
}