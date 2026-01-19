import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { CreateSlotsControllerBodySchema } from './schemas';
import { CreateSlotsUseCase } from 'application/usecases/slots/create';
import { ICreateSlotsControllerAbstractFactory } from './IAbstractFactory';

export class CreateSlotsController implements IController {
  private readonly createSlotsUseCase: CreateSlotsUseCase;

  constructor(factory: ICreateSlotsControllerAbstractFactory) {
    this.createSlotsUseCase = factory.makeCreateSlotsUseCase();
  }

  public async execute(
    request: IControllerRequest<CreateSlotsControllerBodySchema>,
  ): Promise<IControllerResponse> {
    await this.createSlotsUseCase.execute({
      date: request.body.date,
      endTime: request.body.endTime,
      startTime: request.body.startTime,
      therapistId: request.body.therapistId,
    });
    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.CREATED,
    };

    return response;
  }
}
