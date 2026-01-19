import { IClienteDatabaseRepository } from "@infra/database/repositories/client/IClientDatabaseRepository";

export interface ICreateClientUseCaseAbstractFactory {
  makeClientRepository(): IClienteDatabaseRepository;
}