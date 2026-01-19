import { IUseCase } from 'shared/interfaces/IUseCase';
import { ICreateSlotsUseCaseInputData } from './InputData';
import { ICreateSlotsUseCaseDatabaseFactory } from './IAbstractFactory';
import { ISlotsDatabaseRepository } from '@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository';
import { ITherapistDatabaseRepository } from '@infra/database/repositories/therapist/ITherapistDatabaseRepository';
import { addMinutes, format, isBefore, isEqual, parseISO } from 'date-fns';

interface IPerformSlotsInputData {
  date: string;
  period: {
    startTime: string;
    endTime: string;
  };
  slotIntervalMinutes: number;
}

interface IList {
  start: string;
  end: string;
}

interface IPerformSlotsOutputData {
  list: IList[];
}

export class CreateSlotsUseCase implements IUseCase<ICreateSlotsUseCaseInputData, void> {
  private readonly slotsRepository: ISlotsDatabaseRepository;
  private readonly therapistsRepository: ITherapistDatabaseRepository;

  constructor(factory: ICreateSlotsUseCaseDatabaseFactory) {
    this.slotsRepository = factory.makeSlotsRepository();
    this.therapistsRepository = factory.makeTherapistsRepository();
  }

  public async execute(inputData: ICreateSlotsUseCaseInputData): Promise<void> {
    const SLOT_INTERVAL_MINUTES = 15;
    const therapist = await this.therapistsRepository.findById({ id: inputData.therapistId });

    if (!therapist) {
      throw new Error(`Não foi possível encontrar o massagista: #${inputData.therapistId}`);
    }

    const slots = await this.performSlots({
      date: inputData.date,
      slotIntervalMinutes: SLOT_INTERVAL_MINUTES,
      period: { endTime: inputData.endTime, startTime: inputData.startTime },
    });

    if (slots.list.length === 0) {
      throw new Error('Não foi encontrado nenhum horário para criação dos slots');
    }

    await this.slotsRepository.create({
      booked: false,
      slots: slots.list,
      date: inputData.date,
      therapistId: inputData.therapistId,
    });
  }

  private async performSlots(inputData: IPerformSlotsInputData): Promise<IPerformSlotsOutputData> {
    const { date, period, slotIntervalMinutes } = inputData;
    console.log({ inputData });

    const startDateTime = parseISO(`${date}T${period.startTime}`);
    const endDateTime = parseISO(`${date}T${period.endTime}`);

    const list: IList[] = [];

    let current = startDateTime;

    while (
      isBefore(addMinutes(current, slotIntervalMinutes), endDateTime) ||
      isEqual(addMinutes(current, slotIntervalMinutes), endDateTime)
    ) {
      const next = addMinutes(current, slotIntervalMinutes);

      list.push({
        start: format(current, 'HH:mm'),
        end: format(next, 'HH:mm'),
      });

      current = next;
    }

    console.log('list', list);

    const output: IPerformSlotsOutputData = {
      list,
    };

    return output;
  }
}
