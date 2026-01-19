import { and, eq, SQL } from 'drizzle-orm';
import { drizzleDatabase } from '@infra/database';
import { therapistsTable } from '@infra/database/schema';
import { DatabaseError } from '@infra/error/DatabaseError';
import { ITherapistDatabaseRepository } from './ITherapistDatabaseRepository';
import { IListTherapistDatabaseRepositoryInputData } from './dtos/list/InputData';
import { IListTherapistDatabaseRepositoryOutputData } from './dtos/list/OutputData';
import { ICreateTherapistDatabaseRepositoryInputData } from './dtos/create/InputData';
import { IFindByIdTherapistDatabaseRepositoryInputData } from './dtos/findById/InputData';
import { IFindByIdTherapistDatabaseRepositoryOutputData } from './dtos/findById/OutputData';

export class TherapistDatabaseRepository implements ITherapistDatabaseRepository {
  public async findById(
    inputData: IFindByIdTherapistDatabaseRepositoryInputData,
  ): Promise<IFindByIdTherapistDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [data] = await database
        .select()
        .from(therapistsTable)
        .where(eq(therapistsTable.id, inputData.id))
        .limit(1);

      const output: IFindByIdTherapistDatabaseRepositoryOutputData = {
        id: data?.id,
      };

      return output;
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }

  public async list(
    inputData: IListTherapistDatabaseRepositoryInputData,
  ): Promise<IListTherapistDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const whereConditions: SQL[] = [];

      if (inputData?.active != undefined) {
        whereConditions.push(eq(therapistsTable.active, inputData.active));
      }

      const data = await database
        .select({
          id: therapistsTable.id,
          bio: therapistsTable.bio,
          name: therapistsTable.name,
          phone: therapistsTable.phone,
          spacialty: therapistsTable.specialty,
        })
        .from(therapistsTable)
        .where(and(...whereConditions));

      console.log('data', data);

      const output: IListTherapistDatabaseRepositoryOutputData = {
        list: data.map((item) => ({
          id: item.id,
          bio: item.bio,
          name: item.name,
          phone: item.phone,
          specialty: item.spacialty,
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
  public async create(inputData: ICreateTherapistDatabaseRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.insert(therapistsTable).values({
        bio: inputData.bio,
        name: inputData.name,
        phone: inputData.phone,
        active: inputData.active,
        specialty: inputData.specialty,
      });
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
}
