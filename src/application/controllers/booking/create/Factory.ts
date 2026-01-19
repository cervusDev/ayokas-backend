import { CreateBookingController } from ".";
import { CreateBookingUseCase } from "application/usecases/booking/create";
import { CreateBookingUseCaseDatabaseFactory } from "application/usecases/booking/create/Factory";

export function makeCreateBookingController() {
  const controller = new CreateBookingController({
    makeCreateBookingUseCase() {
      const factory = new CreateBookingUseCaseDatabaseFactory();
      const usecase = new CreateBookingUseCase(factory);
      return usecase;
    },
  });
  return controller;
}