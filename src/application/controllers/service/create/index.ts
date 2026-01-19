import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { CreateServiceControllerBody } from './schemas';
import { CreateServiceeUseCase } from 'application/usecases/service/create';
import { ICreateServiceControllerAbstractFactory } from './IAbstractFactory';

export class CreateServiceController implements IController {
  private readonly createSessionTypeUseCase: CreateServiceeUseCase;

  constructor(factory: ICreateServiceControllerAbstractFactory) {
    this.createSessionTypeUseCase = factory.makeCreateServiceUseCase();
  }

  public async execute(
    request: IControllerRequest<CreateServiceControllerBody>,
  ): Promise<IControllerResponse> {
    await this.createSessionTypeUseCase.execute({
      name: request.body.name,
      price: request.body.price,
      active: request.body.active,
      duration: request.body.duration,
    });

    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.CREATED,
    };
    return response;
  }
}
