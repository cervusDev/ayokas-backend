import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { CreateTherapistControllerBody } from './schemas';
import { CreateTherapistUseCase } from 'application/usecases/therapist/create';
import { ICreateTherapistControllerAbstractFactory } from './IAbstractFactory';

export class CreateTherapistController implements IController {
  private readonly createTherapistUseCase: CreateTherapistUseCase;

  constructor(factory: ICreateTherapistControllerAbstractFactory) {
    this.createTherapistUseCase = factory.makeCreateTherapistUsecase();
  }

  public async execute(
    request: IControllerRequest<CreateTherapistControllerBody>,
  ): Promise<IControllerResponse> {
    await this.createTherapistUseCase.execute({
      bio: request.body.bio,
      name: request.body.name,
      phone: request.body.phone,
      specialty: request.body.specialty,
    });

    const response: IControllerResponse = {
      body: null,
      statusCode: EHttpCode.CREATED,
    };
    return response;
  }
}
