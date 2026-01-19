import { IServiceDatabaseRepository } from "@infra/database/repositories/service/IServiceDatabaseRepository";
import { ICreateServiceUseCaseAbstractFactory } from "./IAbstractFactory";
import { ServiceDatabaseRepository } from "@infra/database/repositories/service/ServiceDatabaseRepository";

export class CreateServiceUseCaseDatabaseFactory implements ICreateServiceUseCaseAbstractFactory {
  makeServiceRepository(): IServiceDatabaseRepository {
    return new ServiceDatabaseRepository();
  }
}