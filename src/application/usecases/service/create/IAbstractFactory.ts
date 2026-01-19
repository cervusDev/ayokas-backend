import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";

export interface ICreateServiceUseCaseAbstractFactory {
  makeServiceRepository(): IServiceDatabaseRepository;
}