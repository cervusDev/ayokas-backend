import { IRoute } from './IRoute';
import { slotsRoutes } from './usecases/slotsRoutes';
import { clientRoutes } from './usecases/clientRoutes';
import { bookingRoutes } from './usecases/bookingRoutes';
import { serviceRoutes } from './usecases/serviceRoutes';
import { therapistRoutes } from './usecases/therapistRoutes';

export const routes: IRoute[] = [
  ...slotsRoutes,
  ...clientRoutes,
  ...serviceRoutes,
  ...bookingRoutes,
  ...therapistRoutes,
];
