import { CreateBookingUseCase } from "application/usecases/booking/create";

export interface ICreateBookingControllerAbstractFactory {
  makeCreateBookingUseCase(): CreateBookingUseCase
}