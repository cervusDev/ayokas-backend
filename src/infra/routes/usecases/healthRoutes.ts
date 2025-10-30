import { EHttpCode } from "shared/enums";
import { IRoute } from "../IRoute";
import { healthControllerSchemaResponse } from "application/controller/health/healthControllerSchemas";
import { makeHealthController } from "application/controller/health/healthControllerFactory";

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
