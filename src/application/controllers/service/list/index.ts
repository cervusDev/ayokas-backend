import {
  IController,
  IControllerRequest,
  IControllerResponse,
} from '@infra/interfaces/IController';
import { ListServiceControllerResponse } from './schemas';
import { IListServiceControllerAbastractFactory } from './IAbstractFactory';
import { EHttpCode } from 'shared/enums';
import { ListEmptyResponseError } from '@infra/error/ListEmptyResponseError';
import { ListServiceeUseCase } from 'application/usecases/service/list';

export class ListSessionTypeController implements IController {
  private readonly listTherapistUseCase: ListServiceeUseCase;

  constructor(factory: IListServiceControllerAbastractFactory) {
    this.listTherapistUseCase = factory.makeListServiceUseCase();
  }

  public async execute(
    request: IControllerRequest,
  ): Promise<IControllerResponse<ListServiceControllerResponse>> {
    const { list } = await this.listTherapistUseCase.execute();

    if (list.length === 0) {
      throw new ListEmptyResponseError();
    }

    const output: ListServiceControllerResponse = {
      list: list.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        active: item.active,
        duration: item.duration,
      })),
    };

    const response: IControllerResponse<ListServiceControllerResponse> = {
      body: output,
      statusCode: EHttpCode.OK,
    };

    return response;
  }
}
