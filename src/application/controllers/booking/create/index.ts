import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { CreateBookingControllerBodySchema } from './schemas';
import { CreateBookingUseCase } from 'application/usecases/booking/create';
import { ICreateBookingControllerAbstractFactory } from './IAbstractFactory';

export class CreateBookingController implements IController {
  private readonly createBookingUseCase: CreateBookingUseCase;

  constructor(factory: ICreateBookingControllerAbstractFactory) {
    this.createBookingUseCase = factory.makeCreateBookingUseCase();
  }

  public async execute(
    request: IControllerRequest<CreateBookingControllerBodySchema>,
  ): Promise<IControllerResponse> {
    await this.createBookingUseCase.execute({
      date: request.body.date,
      clientId: request.body.clientId,
      serviceId: request.body.serviceId,
      startTime: request.body.start_time,
      therapistId: request.body.therapistId,
    });

    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.CREATED,
    };

    return response;
  }
}
