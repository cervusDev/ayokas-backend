
import { IController, IControllerRequest, IControllerResponse } from '@infra/interfaces/IController.js';
import { EHttpCode } from 'shared/enums.js';
import { DateHelper } from 'shared/helper/date.js';
import { HealthControllerSchemaResponse } from './healthControllerSchemas';

export class HealthController implements IController {
  public async execute(
    _: IControllerRequest,
  ): Promise<IControllerResponse<HealthControllerSchemaResponse>> {
    const response: IControllerResponse<HealthControllerSchemaResponse> = {
      body: {
        timestamp: DateHelper.now().toISO(),
        status: 'ok',
      },
      statusCode: EHttpCode.OK,
    };
    return response;
  }
}
