import { ICreateSlotsUseCaseDatabaseFactory } from "./IAbstractFactory";
import { SlotsDatabaseRepository } from "@infra/database/repositories/slots/AvaliableSlotDabataseRepository";
import { ISlotsDatabaseRepository } from "@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository";
import { TherapistDatabaseRepository } from "@infra/database/repositories/therapist/TherapistDatabaseRepository";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export class CreateSlotsUseCaseDatabaseFactory implements ICreateSlotsUseCaseDatabaseFactory {
  makeSlotsRepository(): ISlotsDatabaseRepository {
    return new SlotsDatabaseRepository();
  }
  makeTherapistsRepository(): ITherapistDatabaseRepository {
    return new TherapistDatabaseRepository();
  }
};