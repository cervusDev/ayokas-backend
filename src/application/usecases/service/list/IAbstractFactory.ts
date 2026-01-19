import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";

export interface IListServiceUseCaseAbstractFactory {
  makeServiceRepository(): IServiceDatabaseRepository;
}