import { eq } from 'drizzle-orm';
import { drizzleDatabase } from '@infra/database';
import { clientsTable } from '@infra/database/schema';
import { DatabaseError } from '@infra/error/DatabaseError';
import { IClienteDatabaseRepository } from './IClientDatabaseRepository';
import { ICreateClientDatabaseRepositoryInputData } from './dtos/create/InputData';
import { IFindByPhoneClientDatabaseRepositoryInputData } from './dtos/findById/InputData';
import { IFindByPhoneClientDatabaseRepositoryOutputData } from './dtos/findById/OutputData';

export class ClientDatabaseRepository implements IClienteDatabaseRepository {
  public async findByPhone(inputData: IFindByPhoneClientDatabaseRepositoryInputData): Promise<IFindByPhoneClientDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const [client] = await database.select({
        id: clientsTable.id
      }).from(clientsTable).where(eq(clientsTable.phone, inputData.phone)).limit(1);

      const output: IFindByPhoneClientDatabaseRepositoryOutputData = {
        id: client?.id
      }
      
      return output;
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err
      });
    }
  }

  public async create(inputData: ICreateClientDatabaseRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.insert(clientsTable).values({
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        password: inputData.password,
      });
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
}
