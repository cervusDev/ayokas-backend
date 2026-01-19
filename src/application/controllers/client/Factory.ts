import { CreateClientController } from ".";
import { CreateClientUseCase } from "application/usecases/client/create";
import { CreateClientUseCaseDatabaseFactory } from "application/usecases/client/create/Factory";

export function makeCreateClientController() {
  const controller = new CreateClientController({
    makeCreateClientUseCase() {
      const factory = new CreateClientUseCaseDatabaseFactory();
      const usecase = new CreateClientUseCase(factory);
      return usecase;
    },
  });
  return controller;
}