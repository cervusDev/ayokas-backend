import { CreateServiceeUseCase } from "application/usecases/service/create";

export interface ICreateServiceControllerAbstractFactory {
  makeCreateServiceUseCase(): CreateServiceeUseCase;
}