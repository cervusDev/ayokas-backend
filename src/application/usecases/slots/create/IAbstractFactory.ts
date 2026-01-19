import { ISlotsDatabaseRepository } from "@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export interface ICreateSlotsUseCaseDatabaseFactory {
  makeSlotsRepository(): ISlotsDatabaseRepository;
  makeTherapistsRepository(): ITherapistDatabaseRepository;
}