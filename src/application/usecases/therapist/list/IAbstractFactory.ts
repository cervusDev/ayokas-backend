import { ITherapistDatabaseRepository } from "@infra/database/repositories/therapist/ITherapistDatabaseRepository";

export interface IListTherapistUseCaseAbstractFactory {
  makeTherapistRepository(): ITherapistDatabaseRepository;
}