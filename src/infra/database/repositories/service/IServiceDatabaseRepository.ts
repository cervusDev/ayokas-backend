import { IListServiceDatabaseRepositoryOutputData } from './dtos/list/OutputData';
import { ICreateServiceRepositoryDatabaseInputData } from './dtos/create/InputData';
import { IFindByIdServiceDatabaseRepositoryInputData } from './dtos/findById/InputData';
import { IFindByIdServiceDatabaseRepositoryOutputData } from './dtos/findById/OutputData';

export interface IServiceDatabaseRepository {
  findById(
    inputData: IFindByIdServiceDatabaseRepositoryInputData,
  ): Promise<IFindByIdServiceDatabaseRepositoryOutputData>;
  list(): Promise<IListServiceDatabaseRepositoryOutputData>;
  create(inputData: ICreateServiceRepositoryDatabaseInputData): Promise<void>;
}
