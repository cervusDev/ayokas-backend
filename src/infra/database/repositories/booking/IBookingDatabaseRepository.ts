import { ICreateBookingDatabaseRepositoryInputData } from "./dtos/create/InputData";

export interface IBookingDatabaseRepository {
  create(inputData: ICreateBookingDatabaseRepositoryInputData): Promise<void>;
};