import { IBookingDatabaseRepository } from "@infra/database/repositories/booking/IBookingDatabaseRepository";
import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";
import { ISlotsDatabaseRepository } from "@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export interface ICreateBookingUseCaseAbstractFactory {
  makeSlotsRepository(): ISlotsDatabaseRepository;
  makeBookingRepository(): IBookingDatabaseRepository;
  makeServiceRepository(): IServiceDatabaseRepository;
  makeTherapistRepository(): ITherapistDatabaseRepository;
}