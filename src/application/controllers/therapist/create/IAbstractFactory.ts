import { CreateTherapistUseCase } from "application/usecases/therapist/create";

export interface ICreateTherapistControllerAbstractFactory {
  makeCreateTherapistUsecase(): CreateTherapistUseCase;
}