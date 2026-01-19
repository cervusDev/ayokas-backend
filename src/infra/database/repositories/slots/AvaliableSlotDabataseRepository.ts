import { and, eq, gte, inArray, SQL } from 'drizzle-orm';
import { drizzleDatabase } from '@infra/database';
import { DatabaseError } from '@infra/error/DatabaseError';
import { slotsTable, therapistsTable } from '@infra/database/schema';
import { ISlotsDatabaseRepository } from './IAvaliableSlotDatabaseRepository';
import { IListSlotsDatabaseRepositoryInputData } from './dtos/list/InputData';
import { IListSlotsDatabaseRepositoryOutputData } from './dtos/list/OutputData';
import { ICreatSlotsDatabaseRepositoryInputData } from './dtos/create/InputData';
import { IFindByDatabaseRepositoryInputData } from './dtos/findByTherapistId/InputData';
import { IFindByDatabaseRepositoryOutputData } from './dtos/findByTherapistId/OutputData';
import { IBookingDatabaseRepositoryInputData } from './dtos/booked/InputData';

export class SlotsDatabaseRepository implements ISlotsDatabaseRepository {
  public async booked(inputData: IBookingDatabaseRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();
      await database
        .update(slotsTable)
        .set({ booked: true })
        .where(inArray(slotsTable.id, inputData.ids));
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
  public async findBy(
    inputData: IFindByDatabaseRepositoryInputData,
  ): Promise<IFindByDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();
      const whereConditions: SQL[] = [
        eq(slotsTable.booked, inputData.booked),
        eq(slotsTable.date, inputData.date),
        eq(slotsTable.therapistId, inputData.id),
      ];

      const data = await database
        .select()
        .from(slotsTable)
        .where(and(...whereConditions))
        .orderBy(slotsTable.start_time);

      const output: IFindByDatabaseRepositoryOutputData = {
        list: data.map((item) => ({
          id: item.id,
          date: item.date,
          booked: item.booked,
          endTime: item.end_time,
          startTime: item.start_time,
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

  public async list(
    inputData: IListSlotsDatabaseRepositoryInputData,
  ): Promise<IListSlotsDatabaseRepositoryOutputData> {
    try {
      const database = drizzleDatabase.getInstance();

      const whereConditions: SQL[] = [eq(slotsTable.therapistId, inputData.filter.therapistId)];

      if (inputData.filter.date) {
        whereConditions.push(gte(slotsTable.date, inputData.filter.date));
      }

      if (inputData.filter.booked) {
        whereConditions.push(eq(slotsTable.booked, inputData.filter.booked));
      }

      const data = await database
        .select()
        .from(slotsTable)
        .innerJoin(therapistsTable, eq(slotsTable.therapistId, therapistsTable.id))
        .where(and(...whereConditions));

      const therapist = data[0]?.therapists;

      const output: IListSlotsDatabaseRepositoryOutputData = {
        therapist: {
          id: therapist?.id,
          name: therapist?.name,
          phone: therapist?.phone,
        },
        list: data.map((item) => ({
          date: item.therapist_avaliable_slots.date,
          booked: item.therapist_avaliable_slots.booked,
          endTime: item.therapist_avaliable_slots.end_time,
          startTime: item.therapist_avaliable_slots.start_time,
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

  public async create(inputData: ICreatSlotsDatabaseRepositoryInputData): Promise<void> {
    try {
      const database = drizzleDatabase.getInstance();

      const valuesToInsert = inputData.slots.map((slot) => ({
        date: inputData.date,
        booked: inputData.booked,
        therapistId: inputData.therapistId,
        start_time: slot.start,
        end_time: slot.end,
      }));

      await database.insert(slotsTable).values(valuesToInsert);
    } catch (err) {
      throw new DatabaseError({
        err: JSON.stringify(err),
        cause: err,
      });
    }
  }
}
