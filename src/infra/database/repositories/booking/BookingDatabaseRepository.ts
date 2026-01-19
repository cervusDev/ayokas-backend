import { drizzleDatabase } from '@infra/database';
import { bookingsTable } from '@infra/database/schema';
import { DatabaseError } from '@infra/error/DatabaseError';
import { IBookingDatabaseRepository } from './IBookingDatabaseRepository';
import { ICreateBookingDatabaseRepositoryInputData } from './dtos/create/InputData';

export class BookingDatabaseRepository implements IBookingDatabaseRepository {
  public async create(inputData: ICreateBookingDatabaseRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database.insert(bookingsTable).values({
        date: inputData.date,
        status: inputData.status,
        endTime: inputData.endTime,
        clientId: inputData.clientId,
        serviceId: inputData.serviceId,
        startTime: inputData.startTime,
        therapistId: inputData.therapistId,
      });
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
}
