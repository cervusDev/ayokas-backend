import { IRoute } from "../IRoute";
import { baseRoot } from "../baseRoot";
import { EHttpCode } from "shared/enums";
import { makeListTherapistController } from "application/controllers/therapist/list/Factory";
import { makeCreateTherapistController } from "application/controllers/therapist/create/Factory";
import { createTherapistControllerBodySchema } from "application/controllers/therapist/create/schemas";
import { listTherapistControllerQuerySchema, listTherapistControllerResponseSchema } from "application/controllers/therapist/list/schemas";

export const therapistRoutes: IRoute[] = [
  {
    method: 'POST',
    path: `${baseRoot}/v1/therapist`,
    middlewares: [],
    schemas: {
      body: createTherapistControllerBodySchema
    },
    controller: makeCreateTherapistController(),
  },
  {
    method: 'GET',
    path: `${baseRoot}/v1/therapists`,
    schemas: {
      response: {
        [EHttpCode.OK]: listTherapistControllerResponseSchema
      },
      query: listTherapistControllerQuerySchema
    },
    middlewares: [],
    controller: makeListTherapistController()
  }
];
