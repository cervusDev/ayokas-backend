import { IRoute } from '../IRoute';
import { baseRoot } from '../baseRoot';
import { makeCreateClientController } from 'application/controllers/client/Factory';
import { createClientControllerBodySchema } from 'application/controllers/client/schemas';

export const clientRoutes: IRoute[] = [
  {
    method: 'POST',
    path: `${baseRoot}/v1/client`,
    middlewares: [],
    schemas: {
      body: createClientControllerBodySchema,
    },
    controller: makeCreateClientController(),
  },
];
