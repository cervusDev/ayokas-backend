import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { EHttpCode } from 'shared/enums';
import { ListTherapistUseCase } from 'application/usecases/therapist/list';
import { ListEmptyResponseError } from '@infra/error/ListEmptyResponseError';
import { IListTherapistControllerAbastractFactory } from './IAbstractFactory';
import { ListTherapistControllerQuery, ListTherapistControllerResponse } from './schemas';

export class ListTherapistController implements IController {
  private readonly listTherapistUseCase: ListTherapistUseCase;

  constructor(factory: IListTherapistControllerAbastractFactory) {
    this.listTherapistUseCase = factory.makeListTherapistUseCase();
  }

  public async execute(
    request: IControllerRequest<unknown, unknown, ListTherapistControllerQuery>,
  ): Promise<IControllerResponse<ListTherapistControllerResponse>> {
    const { list } = await this.listTherapistUseCase.execute({ active: request.query.active });

    if (list.length === 0) {
      throw new ListEmptyResponseError();
    }

    const output: ListTherapistControllerResponse = {
      list: list.map((item) => ({
        id: item.id,
        bio: item.bio,
        name: item.name,
        phone: item.phone,
        specialty: item.specialty,
      })),
    };

    const response: IControllerResponse<ListTherapistControllerResponse> = {
      body: output,
      statusCode: EHttpCode.OK,
    };

    return response;
  }
}
