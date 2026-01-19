import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { CreateClientControllerBodySchema } from './schemas';
import { CreateClientUseCase } from 'application/usecases/client/create';
import { ICreateClientControllerAbstractFactory } from './IAbstractFactory';

export class CreateClientController implements IController {
  private readonly createClientUseCase: CreateClientUseCase;

  constructor(factory: ICreateClientControllerAbstractFactory) {
    this.createClientUseCase = factory.makeCreateClientUseCase();
  }

  public async execute(
    request: IControllerRequest<CreateClientControllerBodySchema>,
  ): Promise<IControllerResponse> {
    await this.createClientUseCase.execute({
      name: request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      password: request.body.password,
    });

    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.CREATED,
    };

    return response;
  }
}
