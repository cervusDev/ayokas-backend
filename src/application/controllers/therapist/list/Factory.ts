import { ListTherapistController } from '.';
import { ListTherapistUseCase } from 'application/usecases/therapist/list';
import { ListTherapistUseCaseDatabaseFactory } from 'application/usecases/therapist/list/Factory';

export function makeListTherapistController() {
  const controller = new ListTherapistController({
    makeListTherapistUseCase() {
      const factory = new ListTherapistUseCaseDatabaseFactory();
      const usecase = new ListTherapistUseCase(factory);
      return usecase;
    },
  });
  return controller;
}
