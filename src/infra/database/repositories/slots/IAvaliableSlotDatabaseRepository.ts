import { IListSlotsDatabaseRepositoryInputData } from './dtos/list/InputData';
import { IListSlotsDatabaseRepositoryOutputData } from './dtos/list/OutputData';
import { ICreatSlotsDatabaseRepositoryInputData } from './dtos/create/InputData';
import { IFindByDatabaseRepositoryInputData } from './dtos/findByTherapistId/InputData';
import { IFindByDatabaseRepositoryOutputData } from './dtos/findByTherapistId/OutputData';
import { IBookingDatabaseRepositoryInputData } from './dtos/booked/InputData';

export interface ISlotsDatabaseRepository {
  booked(inputData: IBookingDatabaseRepositoryInputData): Promise<void>;
  findBy(
    inputData: IFindByDatabaseRepositoryInputData,
  ): Promise<IFindByDatabaseRepositoryOutputData>;
  create(inputData: ICreatSlotsDatabaseRepositoryInputData): Promise<void>;
  list(
    inputData: IListSlotsDatabaseRepositoryInputData,
  ): Promise<IListSlotsDatabaseRepositoryOutputData>;
}
