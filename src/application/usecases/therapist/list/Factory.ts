import { IListTherapistUseCaseAbstractFactory } from "./IAbstractFactory";
import { TherapistDatabaseRepository } from "@infra/database/repositories/therapist/TherapistDatabaseRepository";
import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export class ListTherapistUseCaseDatabaseFactory implements IListTherapistUseCaseAbstractFactory {
  makeTherapistRepository(): ITherapistDatabaseRepository {
    return new TherapistDatabaseRepository();
  }
}