import { ICreateClientDatabaseRepositoryInputData } from './dtos/create/InputData';
import { IFindByPhoneClientDatabaseRepositoryInputData } from './dtos/findById/InputData';
import { IFindByPhoneClientDatabaseRepositoryOutputData } from './dtos/findById/OutputData';

export interface IClienteDatabaseRepository {
  findByPhone(
    inputData: IFindByPhoneClientDatabaseRepositoryInputData,
  ): Promise<IFindByPhoneClientDatabaseRepositoryOutputData>;
  create(inputData: ICreateClientDatabaseRepositoryInputData): Promise<void>;
}
