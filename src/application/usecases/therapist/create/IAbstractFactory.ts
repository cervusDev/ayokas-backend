import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export interface ICreateTherapistUseCaseAbstractFactory {
  makeTherapistRepository(): ITherapistDatabaseRepository;
}