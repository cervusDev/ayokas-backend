import { IListTherapistDatabaseRepositoryInputData } from "./dtos/list/InputData";
import { IListTherapistDatabaseRepositoryOutputData } from "./dtos/list/OutputData";
import { ICreateTherapistDatabaseRepositoryInputData } from "./dtos/create/InputData";
import { IFindByIdTherapistDatabaseRepositoryInputData } from "./dtos/findById/InputData";
import { IFindByIdTherapistDatabaseRepositoryOutputData } from "./dtos/findById/OutputData";

export interface ITherapistDatabaseRepository {
  create(inputData: ICreateTherapistDatabaseRepositoryInputData): Promise<void>;
  list(inputData:IListTherapistDatabaseRepositoryInputData): Promise<IListTherapistDatabaseRepositoryOutputData>;
  findById(inputData: IFindByIdTherapistDatabaseRepositoryInputData): Promise<IFindByIdTherapistDatabaseRepositoryOutputData>;
}