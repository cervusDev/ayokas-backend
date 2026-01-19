import { IUseCase } from 'shared/interfaces/IUseCase';
import { ICreateBookingUseCaseInputData } from './InputData';
import { ICreateBookingUseCaseAbstractFactory } from './IAbstractFactory';
import { IBookingDatabaseRepository } from '@infra/database/repositories/booking/IBookingDatabaseRepository';
import { IServiceDatabaseRepository } from '@infra/database/repositories/service/IServiceDatabaseRepository';
import { ISlotsDatabaseRepository } from '@infra/database/repositories/slots/IAvaliableSlotDatabaseRepository';
import { ITherapistDatabaseRepository } from '@infra/database/repositories/therapist/ITherapistDatabaseRepository';

interface ISlot {
  id: number;
  startTime: string;
  endTime: string;
  booked: boolean;
}

interface IFindAvailableSequence {
  slots: ISlot[];
  requiredSlots: number;
}

export class CreateBookingUseCase implements IUseCase<ICreateBookingUseCaseInputData, void> {
  private readonly slotsRepository: ISlotsDatabaseRepository;
  private readonly bookingRepository: IBookingDatabaseRepository;
  private readonly serviceRepository: IServiceDatabaseRepository;
  private readonly therapistRepository: ITherapistDatabaseRepository;

  constructor(factory: ICreateBookingUseCaseAbstractFactory) {
    this.slotsRepository = factory.makeSlotsRepository();
    this.bookingRepository = factory.makeBookingRepository();
    this.serviceRepository = factory.makeServiceRepository();
    this.therapistRepository = factory.makeTherapistRepository();
  }

  public async execute(inputData: ICreateBookingUseCaseInputData): Promise<void> {
    const service = await this.serviceRepository.findById({ id: inputData.serviceId });
    if (!service?.id) {
      throw new Error(`Serviço #${inputData.serviceId} não encontrado.`);
    }

    const therapist = await this.therapistRepository.findById({ id: inputData.therapistId });
    if (!therapist?.id) {
      throw new Error(`Massagista #${inputData.therapistId} não encontrado.`);
    }

    const slots = await this.slotsRepository.findBy({
      booked: false,
      id: therapist.id,
      date: inputData.date,
    });

    if (slots.list.length === 0) {
      throw new Error('Não foram encontrados horários disponíveis.');
    }

    const notHasTime = this.verifyTimeToSlots({
      slots: slots.list,
      startTime: inputData.startTime,
    });

    if (notHasTime) {
      throw new Error(
        'O horário solicitado (' +
          inputData.startTime +
          ') é anterior ao primeiro horário disponível (' +
          slots.list[0]?.startTime +
          ').',
      );
    }

    const slotDuration = 15;
    const requiredSlots = Math.ceil(Number(service.duration) / slotDuration);

    const availableSequence = this.findAvailableSequence({ slots: slots.list, requiredSlots });

    if (!availableSequence) {
      throw new Error('Não foi possível encontrar uma sequência de horários disponível.');
    }

    const availableIds = availableSequence.map((s) => s.id);
    await this.slotsRepository.booked({ ids: availableIds });

    const minStartTime = availableSequence[0]?.startTime;
    const maxEndTime = availableSequence[availableSequence.length - 1]?.endTime;

    await this.bookingRepository.create({
      clientId: inputData.clientId,
      serviceId: service.id,
      therapistId: therapist.id,
      date: inputData.date,
      status: 'CONFIRMADA',
      startTime: minStartTime!,
      endTime: maxEndTime!,
    });
  }

  private findAvailableSequence(inputData: IFindAvailableSequence) {
    for (let i = 0; i <= inputData.slots.length - inputData.requiredSlots; i++) {
      let sequenceFound = true;
      for (let j = 0; j < inputData.requiredSlots; j++) {
        const currentSlot = inputData.slots[i + j] as ISlot;
        const nextSlot = inputData.slots[i + j + 1];
        if (currentSlot.booked || (nextSlot && nextSlot.startTime !== currentSlot.endTime)) {
          sequenceFound = false;
          break;
        }
      }
      if (sequenceFound) {
        return inputData.slots.slice(i, i + inputData.requiredSlots);
      }
    }
    return null;
  }

  private verifyTimeToSlots(inputData: { startTime: string; slots: any[] }) {
    const reqTimeParts = inputData.startTime.split(':');
    const reqHours = Number(reqTimeParts[0]);
    const reqMinutes = Number(reqTimeParts[1]);
    const requestedStartMinutes = reqHours * 60 + reqMinutes;

    const firstSlotTimeParts = inputData.slots[0].startTime.split(':');
    const firstSlotHours = Number(firstSlotTimeParts[0]);
    const firstSlotMinutes = Number(firstSlotTimeParts[1]);
    const firstSlotMinutesTotal = firstSlotHours * 60 + firstSlotMinutes;

    return requestedStartMinutes < firstSlotMinutesTotal;
  }
}
