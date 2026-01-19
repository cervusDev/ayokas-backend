import { drizzleDatabase } from '@infra/database';
import { servicesTable } from '@infra/database/schema';
import { DatabaseError } from '@infra/error/DatabaseError';
import { IServiceDatabaseRepository } from './IServiceDatabaseRepository';
import { IListServiceDatabaseRepositoryOutputData } from './dtos/list/OutputData';
import { ICreateServiceRepositoryDatabaseInputData } from './dtos/create/InputData';
import { IFindByIdServiceDatabaseRepositoryInputData } from './dtos/findById/InputData';
import { IFindByIdServiceDatabaseRepositoryOutputData } from './dtos/findById/OutputData';
import { eq } from 'drizzle-orm';

export class ServiceDatabaseRepository implements IServiceDatabaseRepository {
  public async findById(
    inputData: IFindByIdServiceDatabaseRepositoryInputData,
  ): Promise<IFindByIdServiceDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [service] = await database
        .select({
          id: servicesTable.id,
          duration: servicesTable.duration,
        })
        .from(servicesTable)
        .where(eq(servicesTable.id, inputData.id))
        .limit(1);

      const output: IFindByIdServiceDatabaseRepositoryOutputData = {
        id: service?.id,
        duration: service?.duration,
      };

      return output;
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
  public async create(inputData: ICreateServiceRepositoryDatabaseInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.insert(servicesTable).values({
        name: inputData.name,
        price: inputData.price,
        active: inputData.active,
        duration: inputData.duration,
      });
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }

  public async list(): Promise<IListServiceDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const data = await database.select().from(servicesTable);

      const output: IListServiceDatabaseRepositoryOutputData = {
        list: data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          active: item.active,
          duration: item.duration,
        })),
      };

      return output;
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
}
