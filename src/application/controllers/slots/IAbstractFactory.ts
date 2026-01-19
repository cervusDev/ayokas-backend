import { CreateSlotsUseCase } from "application/usecases/slots/create";

export interface ICreateSlotsControllerAbstractFactory {
  makeCreateSlotsUseCase(): CreateSlotsUseCase;
}