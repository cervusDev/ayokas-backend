import { IRoute } from '../IRoute';
import { baseRoot } from '../baseRoot';
import { makeCreateBookingController } from 'application/controllers/booking/create/Factory';
import { createBookingControllerBodySchema } from 'application/controllers/booking/create/schemas';

export const bookingRoutes: IRoute[] = [
  {
    method: 'POST',
    path: `${baseRoot}/v1/booking`,
    middlewares: [],
    schemas: {
      body: createBookingControllerBodySchema,
    },
    controller: makeCreateBookingController(),
  },
];
