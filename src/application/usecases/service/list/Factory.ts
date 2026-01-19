import { IListServiceUseCaseAbstractFactory } from "./IAbstractFactory";
import { ServiceDatabaseRepository } from "@infra/database/repositories/service/ServiceDatabaseRepository";
import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";

export class ListServiceUseCaseDatabaseFactory implements IListServiceUseCaseAbstractFactory {
  makeServiceRepository(): IServiceDatabaseRepository {
    return new ServiceDatabaseRepository();
  }
}