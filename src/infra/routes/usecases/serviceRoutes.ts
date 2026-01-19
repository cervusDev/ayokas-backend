import { IRoute } from "../IRoute";
import { baseRoot } from "../baseRoot";
import { EHttpCode } from "shared/enums";
import { makeCreateServiceController } from "application/controllers/service/create/Factory";
import { makeListSessionTypeController } from "application/controllers/service/list/Factory";
import { createServiceControllerBodySchema } from "application/controllers/service/create/schemas";
import { listServiceControllerResponseSchema } from "application/controllers/service/list/schemas";

export const serviceRoutes: IRoute[] = [
  {
    method: 'POST',
    path: `${baseRoot}/v1/services`,
    middlewares: [],
    schemas: {
      body: createServiceControllerBodySchema
    },
    controller: makeCreateServiceController(),
  },
  {
    method: 'GET',
    path: `${baseRoot}/v1/services`,
    middlewares: [],
    schemas: {
      response: {
        [EHttpCode.OK]: listServiceControllerResponseSchema
      },
    },
    controller: makeListSessionTypeController()
  }
];