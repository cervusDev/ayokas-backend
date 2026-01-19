import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";
import { ICreateTherapistUseCaseAbstractFactory } from "./IAbstractFactory";
import { TherapistDatabaseRepository } from "@infra/database/repositories/therapist/TherapistDatabaseRepository";

export class CreateTherapistUseCaseDatabaseFactory implements ICreateTherapistUseCaseAbstractFactory {
  public makeTherapistRepository(): ITherapistDatabaseRepository {
    return new TherapistDatabaseRepository();
  }
}