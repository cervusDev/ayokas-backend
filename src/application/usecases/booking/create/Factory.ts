import { ICreateBookingUseCaseAbstractFactory } from "./IAbstractFactory";
import { BookingDatabaseRepository } from "@infra/database/repositories/booking/BookingDatabaseRepository";
import { ServiceDatabaseRepository } from "@infra/database/repositories/service/ServiceDatabaseRepository";
import { IBookingDatabaseRepository } from "@infra/database/repositories/booking/IBookingDatabaseRepository";
import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";
import { SlotsDatabaseRepository } from "@infra/database/repositories/slots/AvaliableSlotDabataseRepository";
import { ISlotsDatabaseRepository } from "@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository";
import { TherapistDatabaseRepository } from "@infra/database/repositories/therapist/TherapistDatabaseRepository";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export class CreateBookingUseCaseDatabaseFactory implements ICreateBookingUseCaseAbstractFactory {
  makeSlotsRepository(): ISlotsDatabaseRepository {
    return new SlotsDatabaseRepository();
  }
  makeServiceRepository(): IServiceDatabaseRepository {
    return new ServiceDatabaseRepository();
  }
  makeTherapistRepository(): ITherapistDatabaseRepository {
    return new TherapistDatabaseRepository();
  }
  makeBookingRepository(): IBookingDatabaseRepository {
    return new BookingDatabaseRepository();
  }
};