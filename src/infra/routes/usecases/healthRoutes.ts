import { EHttpCode } from "shared/enums";
import { IRoute } from "../IRoute";
import { makeHealthController } from "usecases/health/controller/healthControllerFactory";
import { healthControllerSchemaResponse } from "usecases/health/controller/healthControllerSchemas";

export const healthRoutes: IRoute[] = [
  {
    method: 'GET',
    path: '/health',
    middlewares: [],
    schemas: {
      response: {
        [EHttpCode.OK]: healthControllerSchemaResponse,
      },
    },
    controller: makeHealthController(),
  },
];
