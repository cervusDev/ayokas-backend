import { ListSessionTypeController } from '.';
import { ListServiceUseCaseDatabaseFactory } from 'application/usecases/service/list/Factory';
import { ListServiceeUseCase } from 'application/usecases/service/list';

export function makeListSessionTypeController() {
  const controller = new ListSessionTypeController({
    makeListServiceUseCase() {
      const factory = new ListServiceUseCaseDatabaseFactory();
      const usecase = new ListServiceeUseCase(factory);
      return usecase;
    },
  });
  return controller;
}
