import { ICreateClientUseCaseAbstractFactory } from "./IAbstractFactory";
import { ClientDatabaseRepository } from "@infra/database/repositories/client/ClientDatabaseRepository";
import { IClienteDatabaseRepository } from "@infra/database/repositories/client/IClientDatabaseRepository";

export class CreateClientUseCaseDatabaseFactory implements ICreateClientUseCaseAbstractFactory {
  makeClientRepository(): IClienteDatabaseRepository {
    return new ClientDatabaseRepository();
  }
};