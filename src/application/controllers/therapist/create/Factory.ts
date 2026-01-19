import { CreateTherapistController } from ".";
import { CreateTherapistUseCase } from "application/usecases/therapist/create";
import { CreateTherapistUseCaseDatabaseFactory } from "application/usecases/therapist/create/Factory";

export function makeCreateTherapistController() {
  const controller = new CreateTherapistController({
    makeCreateTherapistUsecase() {
      const factory = new CreateTherapistUseCaseDatabaseFactory();
      const useCase = new CreateTherapistUseCase(factory);
      return useCase;
    },
  });
  return controller;
}
