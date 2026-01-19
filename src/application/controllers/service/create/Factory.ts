import { CreateServiceController } from ".";
import { CreateServiceeUseCase } from "application/usecases/service/create";
import { CreateServiceUseCaseDatabaseFactory } from "application/usecases/service/create/Factory";

export function makeCreateServiceController() {
  const controller = new CreateServiceController({
    makeCreateServiceUseCase() {
      const factory = new CreateServiceUseCaseDatabaseFactory();
      const useCase = new CreateServiceeUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
