import { CreateSlotsController } from ".";
import { CreateSlotsUseCase } from "application/usecases/slots/create";
import { CreateSlotsUseCaseDatabaseFactory } from "application/usecases/slots/create/Factory";

export function makeCreateSlotsController() {
  const controller = new CreateSlotsController({
    makeCreateSlotsUseCase() {
      const factory = new CreateSlotsUseCaseDatabaseFactory();
      const usecases = new CreateSlotsUseCase(factory);
      return usecases;
    },
  })
  return controller;
}