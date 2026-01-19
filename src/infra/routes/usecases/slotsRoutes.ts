import { IRoute } from '../IRoute';
import { baseRoot } from '../baseRoot';
import { makeCreateSlotsController } from 'application/controllers/slots/Factory';
import { createSlotsControllerBodySchema } from 'application/controllers/slots/schemas';

export const slotsRoutes: IRoute[] = [
  {
    method: 'POST',
    path: `${baseRoot}/v1/slots`,
    middlewares: [],
    schemas: {
      body: createSlotsControllerBodySchema,
    },
    controller: makeCreateSlotsController(),
  },
];
