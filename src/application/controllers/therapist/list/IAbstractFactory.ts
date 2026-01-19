import { ListTherapistUseCase } from "application/usecases/therapist/list";

export interface IListTherapistControllerAbastractFactory {
  makeListTherapistUseCase(): ListTherapistUseCase;
}